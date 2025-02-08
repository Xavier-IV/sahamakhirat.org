"use server";

import { logtail } from "@/lib/logtail/server";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

export type UpdateProjectState = {
  errors?: Partial<
    Record<
      | "projectName"
      | "projectDescription"
      | "projectWebsite"
      | "image"
      | "projectReadme",
      string
    >
  >;
  message?: string;
  values?: {
    projectName: string;
    projectDescription: string;
    projectWebsite: string;
    projectReadme: string;
  };
};

const updateProjectSchema = z.object({
  userId: z.string().uuid(),
  projectId: z.string().uuid(),
  projectName: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(50, "Project name must be at most 50 characters"),
  projectDescription: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1500, "Description must be at most 1500 characters"),
  projectWebsite: z.string().url("Invalid website URL"),
  projectReadme: z.string().optional(),
  image: z
    .any()
    .optional()
    .refine(
      (file) => !file || file instanceof File,
      "Uploaded file must be a valid image",
    )
    .refine(
      (file) => !file || file.size <= 5 * 1024 * 1024,
      "Image size must be 5MB or less",
    ),
});

export async function updateProject(
  prevState: UpdateProjectState | void,
  formData: FormData,
): Promise<UpdateProjectState | void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    logtail.warn("Unauthorized access attempt to update project.");
    logtail.flush();
    redirect("/signin");
  }

  const parsed = updateProjectSchema.safeParse({
    userId: formData.get("userId"),
    projectId: formData.get("projectId"),
    projectName: formData.get("projectName"),
    projectDescription: formData.get("projectDescription"),
    projectWebsite: formData.get("projectWebsite"),
    projectReadme: formData.get("projectReadme"),
    image: formData.get("image") as File | null,
  });

  if (!parsed.success) {
    logtail.warn("Project update validation failed", {
      errors: parsed.error.format(),
    });

    return {
      errors: Object.fromEntries(
        Object.entries(parsed.error.flatten().fieldErrors).map(
          ([key, value]) => [key, value?.[0] ?? ""],
        ),
      ) as UpdateProjectState["errors"],
      message: "Please fix the errors below.",
      values: {
        projectName: formData.get("projectName") as string,
        projectDescription: formData.get("projectDescription") as string,
        projectWebsite: formData.get("projectWebsite") as string,
        projectReadme: formData.get("projectReadme") as string,
      },
    };
  }

  const {
    projectId,
    projectName,
    projectDescription,
    projectWebsite,
    projectReadme,
    image,
  } = parsed.data;

  const { data: existingProject, error: fetchError } = await supabase
    .from("projects")
    .select("image_url")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .single();

  if (fetchError) {
    logtail.error("Failed to fetch project details", { fetchError });
    return {
      message: "Failed to fetch project details.",
    };
  }

  let imageUrl = existingProject.image_url;

  if (image && image.size > 0) {
    try {
      const fileExt = image.name.split(".").pop() || "jpg";
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const fileMimeType = image.type || "image/jpeg";

      const buffer = await image.arrayBuffer();
      const fileBlob = new Blob([buffer], { type: fileMimeType });

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("project-images")
        .upload(fileName, fileBlob, {
          contentType: fileMimeType,
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        logtail.error("Image upload failed", { uploadError });
        return {
          message: "Image upload failed, keeping existing image.",
        };
      }

      imageUrl = uploadData.path;
    } catch (error) {
      logtail.error("Error processing image file", { error });
      return {
        message: "Error processing image file, keeping existing image.",
      };
    }
  }

  const { error: updateError } = await supabase
    .from("projects")
    .update({
      title: projectName,
      description: projectDescription,
      website: projectWebsite,
      image_url: imageUrl,
      readme: projectReadme,
    })
    .eq("id", projectId)
    .eq("user_id", user.id);

  if (updateError) {
    logtail.error("Failed to update project", { updateError });
    return { message: "Failed to update project." };
  }

  logtail.info("Project updated successfully", {
    projectId,
    projectName,
    userId: user.id,
  });

  logtail.flush();
  revalidateTag('projects');
  revalidatePath(`/project/${projectId}`);
  redirect("/dashboard");
}

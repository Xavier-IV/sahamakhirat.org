"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

// ✅ Define TypeScript types
export type CreateProjectState = {
  errors?: Partial<Record<keyof CreateProjectValues | "image", string>>;
  message?: string;
  values: CreateProjectValues;
  imageUrl?: string; // ✅ Store the public URL before returning
};

type CreateProjectValues = {
  projectName: string;
  projectDescription: string;
  projectWebsite: string;
};

// ✅ Define Zod schema for validation
const projectSchema = z.object({
  userId: z.string().uuid(),
  projectName: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(50, "Project name must be less than 50 characters"),
  projectDescription: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1500, "Description must be less than 1500 characters"),
  projectWebsite: z.string().url("Invalid URL format"),
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

export async function createProject(
  prevState: CreateProjectState | void,
  formData: FormData,
): Promise<CreateProjectState | void> {
  const supabase = await createClient();

  const parsed = projectSchema.safeParse({
    userId: formData.get("userId"),
    projectName: formData.get("projectName"),
    projectDescription: formData.get("projectDescription"),
    projectWebsite: formData.get("projectWebsite"),
    image: formData.get("image") as File | null,
  });

  const values = {
    projectName: formData.get("projectName") as string,
    projectDescription: formData.get("projectDescription") as string,
    projectWebsite: formData.get("projectWebsite") as string,
  };

  let imageUrl = prevState?.imageUrl || "https://placehold.co/400x200"; // ✅ Default preview image
  let imagePath: string | null = null; // ✅ Store only the storage path in DB

  if (!parsed.success) {
    return {
      errors: Object.fromEntries(
        Object.entries(parsed.error.flatten().fieldErrors).map(
          ([key, value]) => [key, value?.[0] || ""],
        ),
      ) as Partial<Record<keyof CreateProjectValues, string>>,
      message: "Please fix the errors below.",
      values,
      imageUrl, // ✅ Preserve preview URL across failed submissions
    };
  }

  const { userId, projectName, projectDescription, projectWebsite, image } =
    parsed.data;

  // ✅ Handle image upload only if a new image is provided
  if (image && image.size > 0) {
    try {
      const fileExt = image.name.split(".").pop() || "jpg";
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
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
        return {
          errors: {
            image: "Image upload failed, using placeholder image instead.",
          },
          values,
          imageUrl,
        };
      }

      imagePath = uploadData.path; // ✅ Store only the path
      const { data: publicUrlData } = supabase.storage
        .from("project-images")
        .getPublicUrl(imagePath);
      imageUrl = publicUrlData.publicUrl; // ✅ Get public URL for frontend preview
    } catch (error) {
      console.error(error);
      return {
        errors: {
          image:
            "Error processing image file, using placeholder image instead.",
        },
        values,
        imageUrl,
      };
    }
  }

  const { error: insertError } = await supabase.from("projects").insert([
    {
      user_id: userId,
      title: projectName,
      description: projectDescription,
      image_url: imagePath, // ✅ Store only the storage path
      website: projectWebsite,
      readme: `# ${projectName}\n\n${projectDescription}`,
    },
  ]);

  if (insertError) {
    return { message: "Failed to create project.", values, imageUrl };
  }

  redirect("/dashboard");
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export type UpdateProjectState = {
  errors: Partial<
    Record<"projectName" | "projectDescription" | "projectWebsite", string>
  >;
  message?: string;
  values?: {
    projectName: string;
    projectDescription: string;
    projectWebsite: string;
  };
};

// ✅ Define validation schema
const updateProjectSchema = z.object({
  userId: z.string().uuid(),
  projectId: z.string().uuid(),
  projectName: z
    .string()
    .min(3, "Project name must be at least 3 characters")
    .max(30, "Project name must be at most 30 characters"),
  projectDescription: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(50, "Description must be at most 50 characters"),
  projectWebsite: z.string().url("Invalid website URL"),
});

export async function updateProject(
  prevState: UpdateProjectState | void,
  formData: FormData,
): Promise<UpdateProjectState | void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/join");

  const parsed = updateProjectSchema.safeParse({
    userId: formData.get("userId"),
    projectId: formData.get("projectId"),
    projectName: formData.get("projectName"),
    projectDescription: formData.get("projectDescription"),
    projectWebsite: formData.get("projectWebsite"),
  });

  if (!parsed.success) {
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
      },
    };
  }

  const { projectId, projectName, projectDescription, projectWebsite } =
    parsed.data;

  await supabase
    .from("projects")
    .update({
      title: projectName,
      description: projectDescription,
      website: projectWebsite,
    })
    .eq("id", projectId)
    .eq("user_id", user.id);

  redirect("/dashboard");
}

"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export type UpdateProjectState = {
  errors: Partial<
    Record<"projectName" | "projectDescription" | "projectWebsite", string>
  >;
  message?: string;
  values: {
    projectName: string;
    projectDescription: string;
    projectWebsite: string;
  };
};

// ✅ Define validation schema
const updateProjectSchema = z.object({
  userId: z.string().uuid(),
  projectId: z.string().uuid(),
  projectName: z.string().min(3).max(30),
  projectDescription: z.string().min(10).max(50),
  projectWebsite: z.string().url(),
});

export async function updateProject(
  prevState: UpdateProjectState | void,
  formData: FormData,
): Promise<UpdateProjectState | void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const parsed = updateProjectSchema.safeParse({
    userId: formData.get("userId"),
    projectId: formData.get("projectId"),
    projectName: formData.get("projectName"),
    projectDescription: formData.get("projectDescription"),
    projectWebsite: formData.get("projectWebsite"),
  });

  if (!user) redirect("/join");

  if (!parsed.success) {
    return {
      errors: parsed.error.flatten().fieldErrors as any,
      message: "Please fix the errors below.",
      values: parsed.data,
    };
  }

  console.log(parsed.data);

  const { userId, projectId, projectName, projectDescription, projectWebsite } =
    parsed.data;

  const { error } = await supabase
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

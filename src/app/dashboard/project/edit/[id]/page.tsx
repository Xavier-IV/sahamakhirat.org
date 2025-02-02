import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { EditProjectForm } from "./form";
import { Header } from "@/app/components/header";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;

  // Fetch user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if user is not authenticated
  if (!user) {
    return redirect("/auth");
  }

  // Fetch the project
  const { data: project, error } = await supabase
    .from("projects")
    .select("id, title, description, readme, image_url, website")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error || !project) {
    return (
      <p className="text-center text-red-500">
        Project not found or unauthorized.
      </p>
    );
  }

  // TODO: Fetch public image url here
  let imageUrl = null;
  if (project.image_url && !project.image_url.startsWith("http")) {
    const { data } = supabase.storage
      .from("project-images")
      .getPublicUrl(project.image_url);

    if (data?.publicUrl) {
      imageUrl = data.publicUrl;
    }
  }

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Edit Project</h1>
        <EditProjectForm
          userId={user.id}
          project={project}
          imageUrl={imageUrl}
        />
      </main>
    </>
  );
}

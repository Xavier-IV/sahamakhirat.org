import { createClient } from "@/lib/supabase/client";
import { Header } from "../../components/header";
import { AvatarGroup } from "../../components/avatar-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = createClient();
  const { id } = await params;

  // Fetch project by ID
  const { data: project, error } = await supabase
    .from("projects")
    .select(
      "id, title, description, image_url, website, readme, maintainers(*), contributors(*)",
    )
    .eq("id", id)
    .single();

  if (error || !project) {
    return <div className="text-center text-red-500">Project not found</div>;
  }

  // Fetch all project IDs to determine previous & next project
  const { data: allProjects } = await supabase
    .from("projects")
    .select("id")
    .order("id");

  if (!allProjects) {
    return (
      <div className="text-center text-red-500">
        Error loading project navigation
      </div>
    );
  }

  const projectIndex = allProjects.findIndex((p) => p.id === id);
  const prevProject = projectIndex > 0 ? allProjects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < allProjects.length - 1
      ? allProjects[projectIndex + 1]
      : null;

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{project.title}</h1>
          <div className="flex space-x-4">
            {prevProject && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/project/${prevProject.id}`}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Link>
              </Button>
            )}
            {nextProject && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/project/${nextProject.id}`}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="prose max-w-none">{project.readme}</div>
          </div>
          <div className="lg:w-1/3">
            <div className="bg-muted p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Project Details</h2>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Maintainers</h3>
                <AvatarGroup avatars={project.maintainers} />
                {project.maintainers && project.maintainers.length > 5 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    +{project.maintainers.length - 5} others
                  </p>
                )}
              </div>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Contributors</h3>
                <AvatarGroup avatars={project.contributors} />
                {project.contributors && project.contributors.length > 5 && (
                  <p className="text-sm text-muted-foreground mt-2">
                    +{project.contributors.length - 5} others
                  </p>
                )}
              </div>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Website</h3>
                <Link
                  href={project.website}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.website}
                </Link>
              </div>
              <Button className="w-full">Contribute to this project</Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

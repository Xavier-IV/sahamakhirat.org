import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Header } from "../components/header";
import { ProjectCard } from "../components/project-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();

  // Fetch user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if user is not authenticated
  if (!user) {
    return redirect("/auth");
  }

  // Fetch user's projects
  const { data: userProjects, error } = await supabase
    .from("projects")
    .select(
      "id, title, description, image_url, website, readme, contributors(*), maintainers(*)",
    )
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Projects</h1>
          <div className="flex space-x-4">
            <Button asChild>
              <Link href="/dashboard/project/new">Add New Project</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/dashboard/og-generator">OG Generator</Link>
            </Button>
          </div>
        </div>
        {userProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userProjects.map((project) => (
              <div key={project.id} className="relative">
                <ProjectCard project={project} />
                <div className="absolute top-2 right-2">
                  <Button size="sm" asChild variant="secondary">
                    <Link href={`/dashboard/project/edit/${project.id}`}>
                      Edit
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No projects found.</p>
        )}
      </main>
    </>
  );
}

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "./components/header";
import { ProjectCard } from "./components/project-card";
import { getProjects } from "@/lib/queries/project";

export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const pageParams = (await searchParams).page;
  const page = typeof pageParams === "string" ? Number(pageParams) : 1;
  const limit = 6; // Number of projects per page

  const start = (page - 1) * limit;
  const end = start + limit - 1;


  const {
    data: projects,
    count,
    error,
  } = await getProjects(start, end);

  if (error) throw new Error(error.message);

  const totalPages = Math.ceil((count || 0) / limit);

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No projects found.</p>
        )}

        {page < totalPages && (
          <div className="mt-8 flex justify-center">
            <Button asChild>
              <Link href={`/?page=${page + 1}`}>Load More</Link>
            </Button>
          </div>
        )}
      </main>
    </>
  );
}

import { Header } from "./components/header"
import { ProjectCard } from "./components/project-card"
import { getProjects } from "./data/projects"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const dynamic = "force-dynamic"

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = typeof searchParams.page === "string" ? Number(searchParams.page) : 1
  const limit = 6 // Number of projects per page

  // TODO: Replace with Supabase query
  const { data: projects, count } = await getProjects(page, limit)

  const totalPages = Math.ceil(count / limit)

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
        {page < totalPages && (
          <div className="mt-8 flex justify-center">
            <Button asChild>
              <Link href={`/?page=${page + 1}`}>Load More</Link>
            </Button>
          </div>
        )}
      </main>
    </>
  )
}


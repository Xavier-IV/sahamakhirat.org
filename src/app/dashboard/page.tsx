import { Header } from "../components/header"
import { ProjectCard } from "../components/project-card"
import { getUserProjects } from "../data/projects"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function Dashboard() {
  // TODO: Replace with actual user ID from authentication
  const userId = "mock-user-id"
  const userProjects = await getUserProjects(userId)

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Projects</h1>
          <Button asChild>
            <Link href="/projects/new">Add New Project</Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </main>
    </>
  )
}


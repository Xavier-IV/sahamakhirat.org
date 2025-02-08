import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import rehypeRaw from "rehype-raw";
import { AvatarGroup } from "../../components/avatar-group";
import { Header } from "../../components/header";
import { getAllProjects, getOneProject } from "@/lib/queries/project";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: project, error } = await getOneProject(id);

  if (error || !project) {
    return <div className="text-center text-red-500">Project not found</div>;
  }

  const { data: allProjects } = await getAllProjects();

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
            <div className="prose max-w-none">
              <ReactMarkdown
                rehypePlugins={[
                  rehypeRaw,
                  [
                    rehypeSanitize,
                    {
                      tagNames: [
                        "b",
                        "i",
                        "em",
                        "strong",
                        "a",
                        "p",
                        "ul",
                        "ol",
                        "li",
                        "code",
                        "pre",
                        "blockquote",
                        "h1",
                        "h2",
                        "h3",
                        "h4",
                        "h5",
                        "h6",
                        "br",
                        "hr",
                        "img", // ✅ Allow <img> tags
                      ],
                      attributes: {
                        a: ["href", "title", "target", "rel"],
                        img: [
                          "src",
                          "alt",
                          "title",
                          "width",
                          "height",
                          "loading",
                        ], // ✅ Allow safe attributes for images
                      },
                      protocols: {
                        src: ["http", "https", "data"], // ✅ Support HTTP, HTTPS, and data URIs
                      },
                    },
                  ],
                ]}
              >
                {project.readme || "No README provided."}
              </ReactMarkdown>
            </div>
          </div>

          <div className="lg:w-1/3">
            <div className="bg-muted p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Project Details</h2>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Maintainers</h3>
                <AvatarGroup avatars={project.maintainers} />
              </div>
              <div className="mb-4">
                <h3 className="font-medium mb-2">Contributors</h3>
                <AvatarGroup avatars={project.contributors} />
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

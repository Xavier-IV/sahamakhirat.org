import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { AvatarGroup } from "./avatar-group";
import Image from "next/image";
import { ProjectsQuery } from "@/lib/queries/project";

type ProjectCardProps = {
  project: ProjectsQuery[number];
};

export async function ProjectCard({ project }: ProjectCardProps) {
  const supabase = createClient();

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
    <Link href={`/project/${project?.id}`}>
      <Card className="overflow-hidden shadow-none">
        <Image
          src={imageUrl || "https://placehold.co/600x400"}
          alt={project?.title}
          width={400}
          height={200}
          className="w-full object-cover h-48"
        />
        <CardContent className="p-4 max-h-[200px] h-full overflow-hidden">
          <h3 className="font-semibold text-lg mb-2">{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 truncate">
            {project.description}
          </p>
          <div className="space-y-2">
            {project.maintainers && project.maintainers.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Maintainers
                </p>
                <AvatarGroup
                  avatars={project.maintainers.map(({ name, avatar_url }) => ({
                    name,
                    avatarUrl: avatar_url,
                  }))}
                />
              </div>
            )}
            {project.contributors && project.contributors.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-1">
                  Contributors
                </p>
                <AvatarGroup
                  avatars={project.contributors.map(({ name, avatar_url }) => ({
                    name,
                    avatarUrl: avatar_url,
                  }))}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

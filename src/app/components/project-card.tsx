import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AvatarGroup } from "./avatar-group";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  maintainers?: { name: string; avatarUrl: string }[];
  contributors?: { name: string; avatarUrl: string }[];
}

export function ProjectCard({
  id,
  title,
  description,
  imageUrl,
  maintainers = [],
  contributors = [],
}: ProjectCardProps) {
  return (
    <Link href={`/project/${id}`}>
      <Card className="overflow-hidden shadow-none">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          width={400}
          height={200}
          className="w-full object-cover h-48"
        />
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Contributors</p>
              <AvatarGroup avatars={contributors} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

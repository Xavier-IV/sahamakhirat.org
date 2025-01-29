import * as React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarGroupProps {
  avatars?: { name: string; avatarUrl: string }[];
  max?: number;
}

export function AvatarGroup({ avatars = [], max = 5 }: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remainingCount = Math.max(avatars.length - max, 0);

  return (
    <div className="flex -space-x-2">
      {displayAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          className="w-7 h-7 border-2 border-background text-xs"
        >
          <AvatarImage src={avatar.avatarUrl} alt={avatar.name} />
          <AvatarFallback>{avatar.name[0]}</AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <Avatar className="border-2 border-background w-7 h-7 text-xs">
          <AvatarFallback>+{remainingCount}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}

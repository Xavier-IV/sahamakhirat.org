import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { LucideGithub } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./logout-button";

export async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="w-full py-4 px-6 flex justify-between items-center">
      <div>
        <Link href="/" className="text-2xl font-bold">
          Saham Akhirat
        </Link>
        <p className="text-sm text-muted-foreground">
          A directory for akhirah rewards
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" asChild>
          <Link
            href="https://github.com/Xavier-IV/sahamakhirat.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LucideGithub className="h-5 w-5" />
          </Link>
        </Button>

        <Button variant="ghost" size="sm" asChild>
          <Link href="/about">About</Link>
        </Button>
        {user ? (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <LogoutButton />
          </>
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link href="/signin">Join</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

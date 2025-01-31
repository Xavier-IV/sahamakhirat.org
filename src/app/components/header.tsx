"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";

export function Header() {
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch authenticated user
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
      setLoading(false);
    };

    getUser();
  }, [supabase.auth]);

  // Logout function
  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    router.refresh(); // Refresh session
    router.push("/join"); // Redirect to join page
  };

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
        <Button variant="ghost" size="sm" asChild>
          <Link href="/about">About</Link>
        </Button>
        {loading ? (
          <p className="text-sm text-muted-foreground">Loading...</p>
        ) : user ? (
          <>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? "Logging out..." : "Logout"}
            </Button>
          </>
        ) : (
          <Button variant="outline" size="sm" asChild>
            <Link href="/join">Join</Link>
          </Button>
        )}
      </div>
    </header>
  );
}

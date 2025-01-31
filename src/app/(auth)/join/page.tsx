import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import Component from "./_components/component";

export default async function JoinPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  // Redirect if user is logged in
  if (data.user) {
    return redirect("/");
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-md p-6 rounded-lg">
        <Component />
      </div>
    </div>
  );
}

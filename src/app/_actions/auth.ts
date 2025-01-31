"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

// Logout function (handled as a server action)
export async function handleLogout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

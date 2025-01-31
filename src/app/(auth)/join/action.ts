"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

// ✅ Define authentication validation schema
const authSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must be at most 50 characters long"),
});

export async function signUp(email: string, password: string) {
  const supabase = await createClient();

  // ✅ Validate input using Zod
  const parsed = authSchema.safeParse({ email, password });
  if (!parsed.success) {
    return {
      error: parsed.error.format(),
    };
  }

  const { error } = await supabase.auth.signUp(parsed.data);

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}

export async function signIn(email: string, password: string) {
  const supabase = await createClient();

  // ✅ Validate input using Zod
  const parsed = authSchema.safeParse({ email, password });
  if (!parsed.success) {
    return {
      error: parsed.error.format(),
    };
  }

  const { error } = await supabase.auth.signInWithPassword(parsed.data);

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}

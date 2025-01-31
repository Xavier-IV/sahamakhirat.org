"use server";

import { logtail } from "@/lib/logtail/server";
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
  turnstileToken: z.string().min(1, "CAPTCHA verification failed"),
});

// ✅ Verify Turnstile CAPTCHA
async function verifyTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, response: token }),
    },
  );

  const data = await response.json();
  return data.success;
}

export async function signUp(
  email: string,
  password: string,
  turnstileToken: string,
) {
  const supabase = await createClient();

  // ✅ Validate input using Zod
  const parsed = authSchema.safeParse({ email, password, turnstileToken });
  if (!parsed.success) {
    return { error: parsed.error.format() };
  }

  // ✅ Validate CAPTCHA before proceeding
  const isHuman = await verifyTurnstile(turnstileToken);
  if (!isHuman) {
    return { error: "Failed CAPTCHA verification. Please try again." };
  }

  const { error } = await supabase.auth.signUp(parsed.data);
  if (error) {
    logtail.error("Auth: Unable to register", error);
    return { error: error.message };
  }

  logtail.flush();
  redirect("/");
}

export async function signIn(
  email: string,
  password: string,
  turnstileToken: string,
) {
  const supabase = await createClient();

  // ✅ Validate input using Zod
  const parsed = authSchema.safeParse({ email, password, turnstileToken });
  if (!parsed.success) {
    return { error: parsed.error.format() };
  }

  // ✅ Validate CAPTCHA before proceeding
  const isHuman = await verifyTurnstile(turnstileToken);
  if (!isHuman) {
    return { error: "Failed CAPTCHA verification. Please try again." };
  }

  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) {
    logtail.error("Auth: Unable to sign in", error);
    return { error: error.message };
  }

  logtail.flush();
  redirect("/");
}

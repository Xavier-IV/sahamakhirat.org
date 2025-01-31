"use server";

import { logtail } from "@/lib/logtail/server";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import { validateTurnstileToken } from "next-turnstile";

// ✅ Define authentication validation schema
const authSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must be at most 50 characters long"),
  turnstileToken: z.string().min(1, "CAPTCHA validation required"),
});

export async function signUp(
  email: string,
  password: string,
  turnstileToken: string,
) {
  const supabase = await createClient();

  // ✅ Validate input using Zod
  const parsed = authSchema.safeParse({ email, password, turnstileToken });
  if (!parsed.success) {
    return {
      error: parsed.error.format(),
    };
  }

  // ✅ Validate Turnstile token
  const validationResponse = await validateTurnstileToken({
    token: turnstileToken,
    secretKey: process.env.TURNSTILE_SECRET_KEY!,
  });

  if (!validationResponse.success) {
    logtail.warn("Auth: Turnstile validation failed", { email });
    return { error: "Turnstile validation failed. Please try again." };
  }

  const { error } = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
  });

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
    return {
      error: parsed.error.format(),
    };
  }

  // ✅ Validate Turnstile token
  const validationResponse = await validateTurnstileToken({
    token: turnstileToken,
    secretKey: process.env.TURNSTILE_SECRET_KEY!,
  });

  if (!validationResponse.success) {
    logtail.warn("Auth: Turnstile validation failed", { email });
    return { error: "Turnstile validation failed. Please try again." };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    logtail.error("Auth: Unable to sign in", error);
    return { error: error.message };
  }

  logtail.flush();
  redirect("/");
}

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, signUp } from "../action";
import Script from "next/script";

export function AuthForm({ type }: { type: "signin" | "signup" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({
    email: "",
    password: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const handleAuth = async () => {
    setLoading(true);
    setError(null);
    setErrors({ email: "", password: "" });

    if (!turnstileToken) {
      setError("Please complete the CAPTCHA.");
      setLoading(false);
      return;
    }

    const response =
      type === "signup"
        ? await signUp(email, password, turnstileToken)
        : await signIn(email, password, turnstileToken);

    if (response?.error) {
      if (typeof response.error === "string") {
        setError(response.error);
      } else {
        setErrors({
          email: response.error.email?._errors?.[0] || "",
          password: response.error.password?._errors?.[0] || "",
        });
      }

      setLoading(false);
      return;
    }
  };

  return (
    <div className="space-y-4">
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        async
        defer
      />

      {/* Email Field */}
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
      </div>

      {/* Password Field */}
      <div>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      {/* Cloudflare Turnstile CAPTCHA */}
      <div
        className="cf-turnstile"
        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        data-callback={(token: string) => setTurnstileToken(token)}
      />

      {/* General Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit Button */}
      <Button onClick={handleAuth} disabled={loading} className="w-full">
        {loading ? "Processing..." : type === "signup" ? "Sign Up" : "Sign In"}
      </Button>
    </div>
  );
}

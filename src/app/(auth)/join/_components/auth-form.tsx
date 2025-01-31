"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, signUp } from "../action";
import { z } from "zod";

// ✅ Define Zod Schema for Client-Side Validation
const authSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(50, "Password must be at most 50 characters long"),
});

export function AuthForm({ type }: { type: "signin" | "signup" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({
    email: "",
    password: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setError(null);
    setErrors({ email: "", password: "" });

    const response =
      type === "signup"
        ? await signUp(email, password)
        : await signIn(email, password);

    if (response?.error) {
      // ✅ Ensure response.error is handled correctly
      if (typeof response.error === "string") {
        setError(response.error);
      } else {
        setErrors({
          email: response.error.email?._errors?.[0] || "", // ✅ Access `_errors` array safely
          password: response.error.password?._errors?.[0] || "",
        });
      }

      setLoading(false);
      return;
    }
  };

  return (
    <div className="space-y-4">
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

      {/* General Error */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Submit Button */}
      <Button onClick={handleAuth} disabled={loading} className="w-full">
        {loading ? "Processing..." : type === "signup" ? "Sign Up" : "Sign In"}
      </Button>
    </div>
  );
}

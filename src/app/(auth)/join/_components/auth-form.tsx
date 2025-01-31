"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, signUp } from "../action";

export function AuthForm({ type }: { type: "signin" | "signup" }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = async () => {
    setLoading(true);
    setError(null);

    const response =
      type === "signup"
        ? await signUp(email, password) // Calls the Server Action
        : await signIn(email, password); // Calls the Server Action

    if (response.error) {
      setError(response.error);
      setLoading(false);
      return;
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button onClick={handleAuth} disabled={loading} className="w-full">
        {loading ? "Processing..." : type === "signup" ? "Sign Up" : "Sign In"}
      </Button>
    </div>
  );
}

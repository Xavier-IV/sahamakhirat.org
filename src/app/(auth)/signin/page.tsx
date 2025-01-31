"use client";

import { AuthForm } from "@/app/(auth)/_components/auth-form";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Sign In</h1>
      <AuthForm type="signin" />
      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

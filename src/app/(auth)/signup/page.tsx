"use client";

import { AuthForm } from "@/app/(auth)/_components/auth-form";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <AuthForm type="signup" />
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link href="/signin" className="text-blue-600 hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}

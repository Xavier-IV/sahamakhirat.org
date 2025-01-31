"use client";

import { AuthForm } from "@/app/(auth)/join/_components/auth-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Component() {
  return (
    <Tabs defaultValue="signin">
      <TabsList className="grid grid-cols-2 w-full">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <AuthForm type="signin" />
      </TabsContent>
      <TabsContent value="signup">
        <AuthForm type="signup" />
      </TabsContent>
    </Tabs>
  );
}

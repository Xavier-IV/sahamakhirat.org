"use client";

import { Button } from "@/components/ui/button";
import { handleLogout } from "../_actions/auth";

export default function LogoutButton() {
  return (
    <Button
      onClick={() => handleLogout()}
      variant="outline"
      size="sm"
      type="submit"
    >
      Logout
    </Button>
  );
}

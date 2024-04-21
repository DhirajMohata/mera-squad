"use client"

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";

export default function LogoutBtn() {
  return (
    <Button
      variant={"destructive"}
      className="w-full gap-2 text-secondary"
      onClick={() => signOut()}
    >
      <span>Logout</span>
      <LogOutIcon size={15} />
    </Button>
  )
}

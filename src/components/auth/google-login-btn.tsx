"use client"

import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"

export default function GoogleLoginBtn({
  disabled = false
}: {
  disabled?: boolean
}) {
  return (
    <Button
      variant={"secondary"}
      className="rounded-full font-bold"
      size={"lg"}
      onClick={() =>
        signIn("google", {
          callbackUrl: "/team/manage"
        })
      }
      disabled={disabled}
    >
      <FcGoogle className="mr-2 text-xl" />
      <span>Sign in with Google</span>
    </Button>
  )
}

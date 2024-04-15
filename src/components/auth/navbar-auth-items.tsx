"use client"

import { signIn, useSession } from "next-auth/react"
import Link from "next/link"
import { FcGoogle } from "react-icons/fc"
import { Button } from "../ui/button"
import UserDropdown from "./user-dropdown"

export default function NavbarAuthItems() {
  const { data: session } = useSession()

  return session && session.user ? (
    <div className="flex items-center gap-2">
      <Button variant={"secondary"} className="rounded-full" asChild>
        <Link href={"/team/manage"}>Manage your team</Link>
      </Button>
      <UserDropdown
        name={session.user.name || ""}
        userImage={session.user.image || ""}
      />
    </div>
  ) : (
    <Button
      variant={"secondary"}
      className="rounded-full font-bold"
      size={"lg"}
      onClick={() => signIn("google")}
    >
      <FcGoogle className="mr-2 text-xl" />
      <span>Sign in with Google</span>
    </Button>
  )
}

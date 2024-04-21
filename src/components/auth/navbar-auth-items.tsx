"use client"

import { useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "../ui/button"
import GoogleLoginBtn from "./google-login-btn"
import UserDropdown from "./user-dropdown"

export default function NavbarAuthItems() {
  const { data: session, status } = useSession()
  const isCheckingAuthStatus = status === "loading"

  return (
    <div className="hidden md:block">
      {session && session.user ? (
        <div className="flex w-fit items-center justify-between gap-2">
          <Button variant={"secondary"} className="rounded-full" asChild>
            <Link href={"/team/manage"}>Manage your team</Link>
          </Button>
          <UserDropdown
            name={session.user.name || ""}
            username={session.user.username || ""}
            userImage={session.user.image || ""}
          />
        </div>
      ) : (
        <GoogleLoginBtn disabled={isCheckingAuthStatus} />
      )}
    </div>
  )
}

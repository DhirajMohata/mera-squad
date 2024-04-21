"use client"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MenuIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"
import GoogleLoginBtn from "../auth/google-login-btn"
import LogoutBtn from "../auth/logout-btn"
import { Button } from "../ui/button"
import Logo from "./logo"
import UserAvatar from "./user-avatar"

export default function MobileNavbar() {
  const { data: session, status } = useSession()
  const isCheckingAuthStatus = status === "loading"
  const [toggleSheet, setToggleSheet] = useState(false)

  return (
    <Sheet onOpenChange={() => setToggleSheet((p) => !p)} open={toggleSheet}>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="md:hidden">
        <Logo />
        <div className="flex h-full flex-col items-center justify-between py-10">
          <ul className="flex w-full flex-col space-y-4 text-center">
            <Link
              className="w-full rounded-lg bg-primary/5 px-1 py-2 hover:bg-primary/50 hover:text-primary-foreground"
              href={"/about"}
              onClickCapture={() => setToggleSheet(false)}
            >
              About
            </Link>
            <Link
              className="w-full rounded-lg bg-primary/5 px-1 py-2 hover:bg-primary/50 hover:text-primary-foreground"
              href={
                "mailto:jerrycodes29@gmail.com?subject=Query%20related%20to%20मेरा%20Squad%20Application"
              }
            >
              Support
            </Link>
            {session && session.user && (
              <>
                <Link
                  className="w-full rounded-lg bg-primary/5 px-1 py-2 hover:bg-primary/50 hover:text-primary-foreground"
                  href={"/profile"}
                  onClickCapture={() => setToggleSheet(false)}
                >
                  Profile
                </Link>
                <Link
                  className="w-full rounded-lg bg-primary/5 px-1 py-2 hover:bg-primary/50 hover:text-primary-foreground"
                  href={"/team/my-team"}
                  onClickCapture={() => setToggleSheet(false)}
                >
                  My Team
                </Link>
              </>
            )}
          </ul>

          {session && session.user ? (
            <div className="flex w-full items-center gap-2">
              <div className="flex-[0.6]">
                <UserAvatar
                  name={session.user.name || ""}
                  username={session.user.username || ""}
                  userImage={session.user.image || ""}
                />
              </div>
              <div className="flex-[0.4]">
                <LogoutBtn />
              </div>
            </div>
          ) : (
            <GoogleLoginBtn disabled={isCheckingAuthStatus} />
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

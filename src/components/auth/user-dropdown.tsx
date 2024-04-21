"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { LogOutIcon } from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import UserAvatar from "../site/user-avatar"
import { Button } from "../ui/button"
import LogoutBtn from "./logout-btn"

export default function UserDropdown({
  name,
  username,
  userImage
}: {
  name: string
  username: string
  userImage: string
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-3 rounded-full py-6 hover:opacity-70">
          <UserAvatar name={name} userImage={userImage} username={username} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={"/profile"}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/team/my-team"}>My Team</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={"/"}>Need help?</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <LogoutBtn/>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

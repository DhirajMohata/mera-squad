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
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"

export default function UserDropdown({
  name,
  username,
  userImage
}: {
  name: string
  username: string
  userImage: string
}) {
  const fallbackInitial = useMemo(
    () =>
      name
        .split(" ")
        .map((item) => item.charAt(0))
        .join("")
        .toUpperCase(),
    [name]
  )

  const { data } = useSession()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="gap-3 rounded-full py-6 hover:opacity-70">
          <div className="flex flex-col items-end">
            <p className="text-base font-medium">{name}</p>
            <p className="text-xs">{`@${username}`}</p>
          </div>
          <Avatar>
            <AvatarImage src={userImage} />
            <AvatarFallback>{fallbackInitial}</AvatarFallback>
          </Avatar>
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
        <Button
          variant={"destructive"}
          className="w-full gap-2 text-secondary"
          onClick={() => signOut()}
        >
          <span>Logout</span>
          <LogOutIcon size={15} />
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

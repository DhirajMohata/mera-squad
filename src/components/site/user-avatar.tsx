"use client"

import { useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export default function UserAvatar({
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

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-end">
        <p className="text-base font-medium">{name}</p>
        <p className="text-xs">{`@${username}`}</p>
      </div>
      <Avatar>
        <AvatarImage src={userImage} />
        <AvatarFallback>{fallbackInitial}</AvatarFallback>
      </Avatar>
    </div>
  )
}

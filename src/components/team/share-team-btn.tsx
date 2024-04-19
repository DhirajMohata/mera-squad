"use client"

import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "../ui/button"

export default function ShareTeamButton({
  username
}: {
  username: string | null
}) {
  const router = useRouter()

  if (!username) return null

  return (
    <Button
      onClick={() => {
        const url = window.location.origin + "/team/" + username
        navigator.clipboard.writeText(url)
        toast("URL Copied!", {
          action: {
            label: "Visit",
            onClick: () => router.replace(url)
          }
        })
      }}
    >
      Share your team
    </Button>
  )
}

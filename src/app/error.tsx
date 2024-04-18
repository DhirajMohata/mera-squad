"use client"
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { MdArrowOutward } from "react-icons/md"

// Error components must be Client Components
export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { data: session } = useSession()

  return (
    <Container className="my-auto flex flex-col items-center justify-center space-y-5">
      <div className="space-y-3 text-center">
        <h2 className="text-3xl font-semibold text-primary">Oyeeeeee!</h2>
        <p className="max-w-lg text-lg text-muted-foreground">
          {error.message}
        </p>
      </div>

      <Button variant={"default"} size={"lg"} className="rounded-full" asChild>
        <Link href={session && session.user ? "/team/manage" : "/login"}>
          <span>Meanwhile share your Team.</span>
          <MdArrowOutward />
        </Link>
      </Button>
    </Container>
  )
}

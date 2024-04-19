import { LoadingText } from "@/components/site/loaders"
import ShareTeamButton from "@/components/team/share-team-btn"
import TeamTable from "@/components/team/team-table"
import { Button } from "@/components/ui/button"
import Container from "@/components/ui/container"
import { authOptions } from "@/lib/auth-option"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { Suspense } from "react"
import { MdArrowOutward } from "react-icons/md"

export default async function MyTeam() {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) return null

  const team = await prisma.team.findUnique({
    where: { userId: session.user.id },
    include: {
      players: {
        select: {
          id: true,
          name: true,
          jersey: true,
          type: true,
          photo: true,
          teams: false,
          teamIDs: false
        },
        orderBy: [{ type: "asc" }, { name: "asc" }]
      }
    }
  })

  if (!team || !team?.players) {
    return (
      <div className="flex flex-col items-center justify-center gap-5">
        <h3 className="text-3xl font-medium">No team yet?!😔</h3>

        <Button
          variant={"default"}
          size={"lg"}
          className="rounded-full"
          asChild
        >
          <Link href={"/team/manage"}>
            <span>Create your team</span>
            <MdArrowOutward size={20} />
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <Container className="my-10 w-full space-y-10 px-2">
      <div className="flex flex-col items-center justify-center gap-5 text-center">
        <h3 className="text-3xl md:text-4xl">Your selected squad members</h3>
        <ShareTeamButton username={session.user.username} />
        <Button variant={"link"} size={"lg"} className="rounded-full" asChild>
          <Link href="/profile">
            <span>Change your Public Username if you want?</span>
          </Link>
        </Button>
      </div>

      <Suspense fallback={<LoadingText text="Fetching Your Team Players" />}>
        <TeamTable players={team.players} />
      </Suspense>
    </Container>
  )
}

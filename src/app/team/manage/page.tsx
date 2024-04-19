import { LoadingText } from "@/components/site/loaders"
import ManageTeamForm from "@/components/team/manage-team-form"
import Container from "@/components/ui/container"
import { authOptions } from "@/lib/auth-option"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"
import { Suspense } from "react"

export default async function CreateTeam() {
  const session = await getServerSession(authOptions)
  if (!session) return null

  const players = await prisma.player.findMany({
    select: {
      id: true,
      name: true,
      jersey: true,
      type: true,
      photo: true,
      teams: false,
      teamIDs: false
    }
  })

  const userTeamPlayers = await prisma.team.findUnique({
    where: {
      userId: session.user.id
    },
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
        }
      }
    }
  })

  return (
    <Container className="space-y-10 w-full">
      <div className="space-y-2 px-5 lg:text-center">
        <h3 className="text-3xl font-semibold ">Manage your Players</h3>
        <p>Remove or add just by tapping on the player card.</p>
      </div>

      <Suspense fallback={<LoadingText />}>
        <ManageTeamForm
          players={players}
          userTeamPlayers={userTeamPlayers?.players}
        />
      </Suspense>
    </Container>
  )
}

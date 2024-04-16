import { LoadingText } from "@/components/site/loaders"
import ManageTeamForm from "@/components/team/manage-team-form"
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
    <div className="mx-auto max-w-[1366px] space-y-10">
      <div className="space-y-10 px-5">
        <h3 className="text-3xl font-semibold lg:text-center">
          Pick your Players
        </h3>
      </div>

      <Suspense fallback={<LoadingText />}>
        <ManageTeamForm
          players={players}
          userTeamPlayers={userTeamPlayers?.players}
        />
      </Suspense>
    </div>
  )
}

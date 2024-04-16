import PlayersTable from "@/components/players/players-table"
import { LoadingText } from "@/components/site/loaders"
import prisma from "@/lib/db"
import { Suspense } from "react"

export default async function Team({ params }: { params: { teamId: string } }) {
  const team = await prisma.team.findUnique({
    where: { id: params.teamId },
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
    throw new Error("Invalid Request")
  }

  return (
    <div className="mx-auto max-w-[1366px]">
      <Suspense fallback={<LoadingText text="Fetching Team Players" />}>
        <PlayersTable playerStats={team.players} />
      </Suspense>
    </div>
  )
}

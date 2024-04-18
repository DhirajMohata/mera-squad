import PlayersTable from "@/components/players/players-table"
import { LoadingText } from "@/components/site/loaders"
import Container from "@/components/ui/container"
import { authOptions } from "@/lib/auth-option"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"
import { Suspense } from "react"

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

  return (
    <Container>
      <Suspense fallback={<LoadingText text="Fetching Your Team Players" />}>
        {!team || !team?.players ? (
          <>
            <p>No team yet!</p>
          </>
        ) : (
          <PlayersTable playerStats={team.players} />
        )}
      </Suspense>
    </Container>
  )
}

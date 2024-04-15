import PlayersTable from "@/components/players/players-table"
import { LoadingText } from "@/components/site/loaders"
import Container from "@/components/ui/container"
import prisma from "@/lib/db"
import { Suspense } from "react"

export default async function Home() {
  const playersData = await prisma.player.findMany({
    include: {
      _count: { select: { teams: true } }
    },
    orderBy: [
      {
        teams: {
          _count: "desc"
        }
      },
      {
        jersey: "asc"
      }
    ]
  })

  const playerStats = playersData.map((item) => ({
    id: item.id,
    name: item.name,
    jersey: item.jersey,
    type: item.type,
    photo: item.photo,
    vote: item._count.teams
  }))

  return (
    <Container>
      <h3 className="mb-10 text-center text-3xl font-semibold">
        Current Leaderboard
      </h3>

      <Suspense fallback={<LoadingText />}>
        <PlayersTable playerStats={playerStats} />
      </Suspense>
    </Container>
  )
}

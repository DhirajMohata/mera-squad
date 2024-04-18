import PlayersTable from "@/components/players/players-table"
import { LoadingText } from "@/components/site/loaders"
import Container from "@/components/ui/container"
import prisma from "@/lib/db"
import { Suspense } from "react"

async function getTeamData(username: string) {
  try {
    const userId = (
      await prisma.user.findUnique({
        where: {
          username
        },
        select: {
          id: true
        }
      })
    )?.id

    const team = await prisma.team.findUnique({
      where: { userId },
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

    return team
  } catch (error) {
    throw new Error(`You took a bouncer here. Duck and share your team!😊`)
  }
}

export default async function Team({
  params
}: {
  params: { username: string }
}) {
  const team = await getTeamData(params.username)

  if (!team || !team?.players) {
    throw new Error(
      `I guess the ${params.username} hasn't created the team yet.😔`
    )
  }

  return (
    <Container>
      <Suspense fallback={<LoadingText text="Fetching Team Players" />}>
        <PlayersTable playerStats={team.players} />
      </Suspense>
    </Container>
  )
}

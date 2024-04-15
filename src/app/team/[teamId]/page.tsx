import PlayersTable from "@/components/players/players-table"
import Container from "@/components/ui/container"
import prisma from "@/lib/db"

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
        }
      }
    }
  })

  if (!team || !team?.players) {
    throw new Error("Invalid Request")
  }

  return (
    <Container>
      <PlayersTable playerStats={team.players} />
    </Container>
  )
}

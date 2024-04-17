import PlayersTable from "@/components/players/players-table"
import { LoadingText } from "@/components/site/loaders"
import { authOptions } from "@/lib/auth-option"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { Suspense } from "react"

export default async function Team({
  params
}: {
  params: { username: string }
}) {
  const session = await getServerSession(authOptions)

  const userId =
    session && session.user
      ? session.user.id
      : (
          await prisma.user.findUnique({
            where: {
              username: params.username
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

  if (!team && session && session.user) {
    redirect("/team/manage")
  }

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

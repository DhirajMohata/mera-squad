"use server"

import { authOptions } from "@/lib/auth-option"
import prisma from "@/lib/db"
import { getServerSession } from "next-auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export const manageTeam = async (playerIDs: string[]) => {
  const session = await getServerSession(authOptions)
  if (!session) return redirect("/")
  // TODO : validate if the array contains the valid object id
  if (playerIDs.length !== 15) return

  const {
    user: { id }
  } = session

  const connectQuery = playerIDs.map((item) => ({
    id: item
  }))

  const team = await prisma.team.upsert({
    where: {
      userId: id
    },
    create: {
      playerIDs,
      userId: id,
      players: {
        connect: connectQuery
      }
    },
    update: {
      playerIDs,
      players: {
        connect: connectQuery
      }
    }
  })

  revalidatePath("/")
  redirect("/team/" + team.id)
}

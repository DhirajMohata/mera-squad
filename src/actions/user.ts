"use server"

import { authOptions } from "@/lib/auth-option"
import prisma from "@/lib/db"
import { userSchema } from "@/lib/schemas"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export const updateUsername = async (newUsername: string) => {
  try {
    const session = await getServerSession(authOptions)
    if (!(session && session.user)) return redirect("/")

    const { success } = userSchema
      .pick({ username: true })
      .safeParse({ username: newUsername })

    if (!success) {
      return { message: "Validation failed!" }
    }
    const user = await prisma.user.findUnique({
      where: {
        username: newUsername
      }
    })

    if (user) return { message: "Try different username!" }

    await prisma.user.update({
      where: {
        id: session.user.id
      },
      data: {
        username: newUsername
      }
    })

    return { message: "success" }
  } catch (error) {
    return { message: "Something went wrong!" }
  }
}

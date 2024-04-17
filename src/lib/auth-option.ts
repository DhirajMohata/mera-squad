import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { User } from "@prisma/client"
import { AuthOptions } from "next-auth"
import { Adapter, AdapterUser } from "next-auth/adapters"
import GoogleProvider from "next-auth/providers/google"
import prisma from "./db"

function CustomPrismaAdapter(p: typeof prisma) {
  return {
    ...PrismaAdapter(p),
    createUser: (data: Omit<AdapterUser, "id">) => {
      const username = data?.email.split("@")[0]
      return p.user.create({ data: { ...data, username } })
    }
  }
}

export const authOptions: AuthOptions = {
  adapter: CustomPrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string
    })
  ],
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User
      return token
    },

    async session({ token, session }) {
      session.user = token.user
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login"
  }
}

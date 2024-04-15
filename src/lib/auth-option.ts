import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { User } from "@prisma/client"
import { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import prisma from "./db"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
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
    signIn: "/"
  }
}

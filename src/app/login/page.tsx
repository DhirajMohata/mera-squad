"use client"

import GoogleLoginBtn from "@/components/auth/google-login-btn"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import Container from "@/components/ui/container"
import { useSession } from "next-auth/react"

export default function Login() {
  const { status } = useSession()
  const isCheckingAuthStatus = status === "loading"

  return (
    <Container className="my-auto">
      <Card className="p-10 text-center lg:p-20">
        <CardHeader>
          <CardTitle>Wanakkam!</CardTitle>
          <CardDescription>Share your squad with world.</CardDescription>
        </CardHeader>

        <CardContent>
          <GoogleLoginBtn disabled={isCheckingAuthStatus} />
        </CardContent>
      </Card>
    </Container>
  )
}

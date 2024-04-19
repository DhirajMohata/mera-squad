import Container from "@/components/ui/container"
import UpdateUsernameForm from "@/components/user/update-username-form"
import { authOptions } from "@/lib/auth-option"
import { getServerSession } from "next-auth"

export default async function Profile() {
  const session = await getServerSession(authOptions)

  return (
    <Container className="w-full space-y-10 p-5 md:mx-auto md:w-1/2">
      <h3 className="text-3xl font-semibold">Manage Profile</h3>
      <UpdateUsernameForm currentUsername={session?.user.username || ""} />
    </Container>
  )
}

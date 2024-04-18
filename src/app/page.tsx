import Logo from "@/components/site/logo"
import Container from "@/components/ui/container"
import { MdOutlineSportsCricket } from "react-icons/md"

export default function Home() {
  return (
    <Container className="my-auto space-y-12 p-4">
      <section className="space-y-4 text-center">
        <p className="flex flex-wrap items-center justify-center gap-2">
          Presenting to the Indian Cricket Fans
          <MdOutlineSportsCricket />
        </p>
        <div className="text-primary">
          <Logo size="lg" />
        </div>
        <h5 className="max-w-2xl text-xl font-medium text-muted-foreground">
          {`Rules are simple, login and pick your squad for upcoming World T20 Men's Cricket World Cup and then share with your friends.`}
        </h5>
      </section>
      <h3 className="text-center text-lg font-semibold">
        Leaderboard Coming Soon...
      </h3>
    </Container>
  )
}

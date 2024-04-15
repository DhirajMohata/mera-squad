import Container from "../ui/container"
import Logo from "./logo"

export default function Footer() {
  return (
    <footer className="bg-primary p-5 text-primary-foreground">
      <Container>
        <Logo size="sm" />
      </Container>
    </footer>
  )
}

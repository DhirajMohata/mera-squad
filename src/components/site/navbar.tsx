import NavbarAuthItems from "../auth/navbar-auth-items"
import Container from "../ui/container"
import Logo from "./logo"

export default function Navbar() {
  return (
    <header className="bg-primary p-5 text-primary-foreground">
      <Container className="relative flex flex-wrap items-center justify-between gap-5">
        <Logo />

        <NavbarAuthItems />
      </Container>
    </header>
  )
}

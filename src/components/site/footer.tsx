import Link from "next/link"
import Container from "../ui/container"
import Logo from "./logo"

export default function Footer() {
  return (
    <footer className="bg-primary p-5 text-primary-foreground md:py-7">
      <Container className="mb:border-b mb:pb-5 flex flex-col items-center gap-3 md:flex-row md:items-end md:justify-between">
        <div className="text-center md:text-start">
          <Logo size="sm" />
          <p className="text-xs">©️ 2024 / All rights reserved.</p>
        </div>
        <div className="flex w-fit flex-col-reverse border-t pt-2 md:flex-col md:border-0 md:pt-0">
          <p className="text-center text-sm md:text-end">
            Made with 💙 by
            <Link
              href={"https://twitter.com/jerry_codes"}
              className="ml-1 font-medium underline"
            >
              Jerry
            </Link>
          </p>
          <ul className="space-x-3">
            <Link href={"/"} className="font-medium hover:underline">
              about
            </Link>
            <span>/</span>
            <Link href={"/team/manage"} className="font-medium hover:underline">
              manage
            </Link>
            <span>/</span>
            <Link
              href={
                "mailto:jerrycodes29@gmail.com?subject=Query%20related%20to%20मेरा%20Squad%20Application"
              }
              className="font-medium hover:underline"
            >
              support
            </Link>
          </ul>
        </div>
      </Container>
    </footer>
  )
}

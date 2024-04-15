import Link from "next/link"
import { twMerge } from "tailwind-merge"

export default function Logo({
  size = "default"
}: {
  size?: "default" | "lg" | "sm"
}) {
  return (
    <Link href={"/"} className="block">
      <h3
        className={twMerge(
          "font-semibold",
          size === "default" && "text-3xl",
          size === "lg" && "text-5xl",
          size === "sm" && "text-xl"
        )}
      >
        Logoipsum
      </h3>
    </Link>
  )
}

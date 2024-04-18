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
          "group font-semibold",
          size === "default" && "text-4xl",
          size === "lg" && "text-5xl",
          size === "sm" && "text-2xl"
        )}
      >
        मेरा
        <span className="ml-1 group-hover:underline">Squad</span>
      </h3>
    </Link>
  )
}

import { cn } from "@/lib/utils"
import { LoaderIcon } from "lucide-react"

export const LoadingText = ({
  text = "loading",
  className = ""
}: {
  text?: string
  className?: string
}) => (
  <div
    className={cn(
      "flex animate-pulse items-center justify-center gap-2 font-semibold text-muted-foreground",
      className
    )}
  >
    <LoaderIcon className="animate-spin" />
    <p className="capitalize">{text}</p>
  </div>
)

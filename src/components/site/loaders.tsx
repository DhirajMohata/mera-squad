import { LoaderIcon } from "lucide-react"

export const LoadingText = ({ text = "loading" }: { text?: string }) => (
  <div className="flex animate-pulse items-center justify-center gap-2 font-semibold text-muted-foreground">
    <LoaderIcon className="animate-spin" />
    <p className="capitalize">{text}</p>
  </div>
)

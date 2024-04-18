import { cn } from "@/lib/utils"
import { PlayerStatsType } from "@/types"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"

export default function PlayerCard({
  player,
  className = ""
}: {
  player: PlayerStatsType
  className?: string | boolean
}) {
  const { jersey, name, type } = player

  return (
    <Card
      className={cn(
        "relative h-52 gap-0 border-2 border-background text-center transition hover:ring-2 hover:ring-primary hover:ring-offset-2",
        className
      )}
    >
      <CardHeader className="p-3 py-4 text-start md:p-6 ">
        <CardTitle>{name}</CardTitle>
        <CardDescription className="font-semibold">{type}</CardDescription>
      </CardHeader>
      <p className="absolute bottom-0 right-2 text-8xl font-semibold text-primary/40 md:text-9xl">
        {jersey}
      </p>
    </Card>
  )
}

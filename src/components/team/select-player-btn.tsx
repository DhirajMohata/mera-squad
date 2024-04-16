"use client"

import { cn } from "@/lib/utils"
import { TeamPlayerType } from "@/types"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"

export default function SelectPlayerBtn({
  player,
  selectedPlayers,
  selectPlayer
}: {
  player: TeamPlayerType
  selectedPlayers: TeamPlayerType[]
  selectPlayer: (player: TeamPlayerType) => void
}) {
  const { name, jersey, type } = player

  const selectedPlayerIdx = selectedPlayers.findIndex(
    (item) => item.id === player.id
  )

  return (
    <button
      type="button"
      className="relative h-full transition"
      onClick={() => selectPlayer(player)}
    >
      <Card
        className={cn(
          "relative h-52 gap-0 border-2 border-background text-center transition hover:border-muted-foreground",
          selectedPlayerIdx !== -1 && "border-2 border-primary"
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
      {selectedPlayerIdx !== -1 && <TickIcon index={selectedPlayerIdx} />}
    </button>
  )
}

function TickIcon({ index }: { index: number }) {
  return (
    <div className="absolute -right-4 -top-2 z-10">
      <div className="w-fit rounded-full bg-primary p-1 px-3 text-sm font-bold text-white">
        {index + 1}
      </div>
    </div>
  )
}

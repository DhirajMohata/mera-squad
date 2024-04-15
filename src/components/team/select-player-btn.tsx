"use client"

import { cn } from "@/lib/utils"
import { TeamPlayerType } from "@/types"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card"

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
          "flex h-full flex-col items-center justify-center border-2 border-background text-center transition hover:border-muted-foreground",
          selectedPlayerIdx !== -1 && "border-2 border-primary"
        )}
      >
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-6xl font-semibold">{jersey}</p>
        </CardContent>
        <CardFooter>
          <p className="text-xl">{type}</p>
        </CardFooter>
      </Card>
      {selectedPlayerIdx !== -1 && <TickIcon index={selectedPlayerIdx} />}
    </button>
  )
}

function TickIcon({ index }: { index: number }) {
  return (
    <div className="absolute -right-4 -top-2 z-10">
      <div className="w-fit rounded-full font-bold bg-primary p-1 px-3 text-sm text-white">
        {index + 1}
      </div>
    </div>
  )
}

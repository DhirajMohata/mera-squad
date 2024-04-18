"use client"

import { TeamPlayerType } from "@/types"
import { TiTick } from "react-icons/ti"
import PlayerCard from "../players/player-card"

export default function SelectPlayerBtn({
  player,
  selectedPlayers,
  selectPlayer
}: {
  player: TeamPlayerType
  selectedPlayers: TeamPlayerType[]
  selectPlayer: (player: TeamPlayerType) => void
}) {
  const selectedPlayerIdx = selectedPlayers.findIndex(
    (item) => item.id === player.id
  )

  const selectPlayerCardStyle =
    selectedPlayerIdx !== -1 &&
    "border-2 border-primary hover:border-background"

  return (
    <button
      type="button"
      className="group relative h-full transition"
      onClick={() => selectPlayer(player)}
    >
      <PlayerCard player={player} className={selectPlayerCardStyle} />
      {selectedPlayerIdx !== -1 && <TickIcon />}
    </button>
  )
}

function TickIcon() {
  return (
    <div className="absolute -right-2 -top-2 z-10 transition ">
      <div className="w-fit rounded-full bg-primary p-1 text-sm font-bold text-white">
        <TiTick />
      </div>
    </div>
  )
}

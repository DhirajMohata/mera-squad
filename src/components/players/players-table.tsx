import { PlayerStatsType } from "@/types"
import PlayerCard from "./player-card"

export default function PlayersTable({
  playerStats = []
}: {
  playerStats: PlayerStatsType[]
}) {
  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
      {playerStats.map((item) => (
        <PlayerCard key={item.id} player={item} />
      ))}
    </div>
  )
}

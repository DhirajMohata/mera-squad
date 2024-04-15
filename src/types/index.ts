import { Player } from "@prisma/client"

export type TeamPlayerType = Omit<Player, "teams" | "teamIDs">

export type PlayerStatsType = Omit<Player, "teams" | "teamIDs"> & {
  vote?: number
}

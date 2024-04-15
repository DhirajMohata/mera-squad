import { formatCmpctNumber } from "@/lib/utils"
import { PlayerStatsType } from "@/types"

export default function PlayerCard({ player }: { player: PlayerStatsType }) {
  const { jersey, name, vote, type } = player

  return (
    <section className="flex w-full items-center gap-4 rounded-full bg-secondary p-5 text-secondary-foreground">
      <p className="w-14 text-center text-3xl text-muted-foreground">
        {jersey}
      </p>
      <div className="grow ">
        <h3 className="text-3xl font-semibold">{name}</h3>
        <h6 className="text-lg font-medium text-muted-foreground">{type}</h6>
      </div>
      {vote !== undefined && (
        <p className="min-w-14 text-center text-4xl">
          {formatCmpctNumber(vote)}
        </p>
      )}
    </section>
  )
}

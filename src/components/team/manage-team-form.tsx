"use client"

import { manageTeam } from "@/actions/team"
import { TeamPlayerType } from "@/types"
import { useCallback, useEffect, useState } from "react"
import { RxCross1 } from "react-icons/rx"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import SelectPlayerBtn from "./select-player-btn"

export default function ManageTeamForm({
  players,
  userTeamPlayers
}: {
  players: TeamPlayerType[]
  userTeamPlayers: TeamPlayerType[] | undefined
}) {
  const [selectedPlayers, setSelectedPlayers] = useState<TeamPlayerType[]>(
    userTeamPlayers ?? []
  )
  const [searchPlayer, setSearchPlayer] = useState("")
  const [filteredPlayers, setFilteredPlayers] =
    useState<TeamPlayerType[]>(players)

  const onSelectPlayer = (player: TeamPlayerType) => {
    setSelectedPlayers((prevState) => {
      const isPlayerAdded = prevState.some((p) => p.id === player.id)
      if (!isPlayerAdded) {
        if (prevState.length < 15) {
          return [...prevState, player]
        } else {
          toast.error("15 players are selected!")
          return prevState
        }
      } else {
        return prevState.filter((p) => p.id !== player.id)
      }
    })
  }

  const removePlayer = (player: TeamPlayerType) => {
    setSelectedPlayers((prevState) =>
      prevState.filter((p) => p.id !== player.id)
    )
  }

  const getFilteredPlayers = useCallback(
    () =>
      players.filter(
        (item) =>
          item.name.toLowerCase().includes(searchPlayer) ||
          item.type.toLowerCase().includes(searchPlayer) ||
          String(item.jersey).includes(searchPlayer)
      ),
    [players, searchPlayer]
  )

  useEffect(() => {
    setFilteredPlayers(getFilteredPlayers)
  }, [getFilteredPlayers])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (selectedPlayers.length !== 15 || selectedPlayers === userTeamPlayers)
      return

    const playerIDs = selectedPlayers.map((item) => item.id)
    manageTeam(playerIDs)
  }

  return (
    <form onSubmit={handleSubmit}>
      <section className="flex gap-4">
        <aside className="sticky top-1 h-full w-1/2 space-y-4 py-2.5 md:w-1/4">
          <h3 className="border-b pb-4 text-2xl font-semibold">Your Players</h3>

          {selectedPlayers.length === 0 ? (
            <p className="text-muted-foreground">
              Start picking your player by tapping on their card.
            </p>
          ) : (
            <>
              <p className="font-semibold text-muted-foreground">
                <span>Total: {selectedPlayers.length}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedPlayers.map((item) => (
                  <Button
                    variant={"secondary"}
                    size={"sm"}
                    className="justify-start font-bold hover:bg-red-500 hover:text-red-50 hover:line-through"
                    key={item.id}
                    onClick={() => removePlayer(item)}
                  >
                    <p>{item.name}</p>
                  </Button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Click on above list if you want to remove player or simply tap
                on player card.
              </p>
              {selectedPlayers.length === 15 && (
                <Button className="w-full">Update Team</Button>
              )}
            </>
          )}
        </aside>

        <div className="w-full space-y-4">
          <div className="sticky top-0 z-20 bg-background py-2.5 ">
            <div className="relative">
              <label htmlFor="search" className="sr-only">
                Search Players
              </label>
              <Input
                placeholder="Search by name, type, or jersey number"
                value={searchPlayer}
                onChange={(e) => setSearchPlayer(e.target.value)}
                className="h-12 text-lg"
              />

              {searchPlayer && (
                <Button
                  size={"icon"}
                  className="absolute right-0 top-0 m-1"
                  onClick={() => setSearchPlayer("")}
                >
                  <RxCross1 />
                </Button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
            {filteredPlayers.map((item) => (
              <SelectPlayerBtn
                key={item.id}
                player={item}
                selectPlayer={onSelectPlayer}
                selectedPlayers={selectedPlayers}
              />
            ))}
          </div>
        </div>
      </section>
    </form>
  )
}

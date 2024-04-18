"use client"

import { manageTeam } from "@/actions/team"
import { TeamPlayerType } from "@/types"
import { useCallback, useEffect, useState, useTransition } from "react"
import { RxCross1, RxLineHeight } from "react-icons/rx"
import { toast } from "sonner"
import { LoadingText } from "../site/loaders"
import { Button } from "../ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "../ui/collapsible"
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

  const [isLoading, startTransition] = useTransition()

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

    startTransition(() => {
      const playerIDs = selectedPlayers.map((item) => item.id)
      manageTeam(playerIDs)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="sticky top-0 z-50 bg-background p-5">
        <Collapsible className="space-y-4">
          <div className="flex  items-center justify-between gap-2">
            <h3 className="text-2xl font-semibold">
              <span>Players: </span>
              {selectedPlayers.length}
            </h3>

            <div className="flex items-center space-x-2">
              {selectedPlayers.length !== 0 && (
                <CollapsibleTrigger asChild>
                  <Button variant={"outline"}>
                    <RxLineHeight />
                    <p className="my-auto ml-2 hidden md:block">Your list</p>
                  </Button>
                </CollapsibleTrigger>
              )}
              <Button disabled={selectedPlayers.length !== 15 || isLoading}>
                {isLoading ? (
                  <LoadingText
                    text="Processing"
                    className="text-primary-foreground"
                  />
                ) : userTeamPlayers ? (
                  "Update Team"
                ) : (
                  "Create Team"
                )}
              </Button>
            </div>
          </div>

          {selectedPlayers.length === 0 ? (
            <p className="text-muted-foreground">
              Don&apos;t wait too long! Pick you favourites first.
            </p>
          ) : (
            <>
              <CollapsibleContent>
                <div className="mb-4 flex flex-wrap gap-3">
                  {selectedPlayers.map((item) => (
                    <Button
                      variant={"secondary"}
                      size={"sm"}
                      className="justify-start text-base font-bold hover:bg-red-500 hover:text-red-50 hover:line-through"
                      key={item.id}
                      onClick={() => removePlayer(item)}
                    >
                      {item.name}
                    </Button>
                  ))}
                </div>
                <div className="flex items-center justify-between gap-2 md:flex-row">
                  <p className="max-w-xs text-sm text-muted-foreground">
                    Click on player name to remove player.
                  </p>
                  <Button
                    variant={"destructive"}
                    onClick={() => setSelectedPlayers([])}
                  >
                    Clear List
                  </Button>
                </div>
              </CollapsibleContent>
            </>
          )}
          <div className="relative">
            <label htmlFor="search" className="sr-only">
              Search Players
            </label>
            <Input
              placeholder="Search by name, type, or jersey number"
              value={searchPlayer}
              onChange={(e) => setSearchPlayer(e.target.value.toLowerCase())}
            />

            {searchPlayer && (
              <Button
                variant={"link"}
                size={"icon"}
                className="absolute right-0 top-0 p-1"
                onClick={() => setSearchPlayer("")}
              >
                <RxCross1 />
              </Button>
            )}
          </div>
        </Collapsible>
      </div>

      <div className="w-full space-y-4 p-5">
        <div className="grid min-h-[60dvh] grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
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
    </form>
  )
}

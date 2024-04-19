import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { TeamPlayerType } from "@/types"

export default function TeamTable({
  players = []
}: {
  players: TeamPlayerType[]
}) {
  return (
    <Table className="mx-auto max-w-2xl">
      <TableHeader className="bg-secondary text-secondary-foreground">
        <TableRow>
          <TableHead className="w-[50px] md:w-[100px] md:text-center">
            Jersey
          </TableHead>
          <TableHead>Player</TableHead>
          <TableHead className="text-right">Type</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {players.map((item) => (
          <TableRow key={item.id} className="">
            <TableCell className="w-[50px] text-2xl font-medium md:w-[100px] md:text-center">
              {item.jersey}
            </TableCell>
            <TableCell className="text-lg">{item.name}</TableCell>
            <TableCell className="text-right">{item.type}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

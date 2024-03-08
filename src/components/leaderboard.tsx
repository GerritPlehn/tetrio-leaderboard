import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { api } from "@/trpc/server";
import { getCurrentUser } from "@/lib/session";

export async function Leaderboard() {
  const user = await getCurrentUser();

  const queryFunction = user
    ? api.score.getHighscores
    : api.score.getAnonymousHighscores;

  const scores = await queryFunction.query();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rank</TableHead>
          <TableHead>Player</TableHead>
          <TableHead>Achieved At</TableHead>
          <TableHead className="text-right">Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {scores.map((score, index) => {
          const ownScore = user?.email === score.player;
          return (
            <TableRow key={score.id} className={ownScore ? "bg-accent" : ""}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{score.player}</TableCell>
              <TableCell>
                {Intl.DateTimeFormat().format(score.played_at)}
              </TableCell>
              <TableCell className="text-right">{score.score}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

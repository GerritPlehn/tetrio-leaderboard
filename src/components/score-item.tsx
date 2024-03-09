import Link from "next/link";

import { formatDate } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { type Score } from "types/score";

interface ScoreItemProps {
  score: Pick<Score, "id" | "played_at" | "score">;
}

export function ScoreItem({ score }: ScoreItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${score.id}`}
          className="font-semibold hover:underline"
        >
          {Intl.NumberFormat().format(score.score)}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(score.played_at?.toDateString())}
          </p>
        </div>
      </div>
    </div>
  );
}

ScoreItem.Skeleton = function ScoreItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};

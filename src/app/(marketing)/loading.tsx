import { CardSkeleton } from "@/components/card-skeleton";
import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";

export default function DashboardBillingLoading() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Leaderboard"
        text="The best scores submitted yet. Get in on the action!"
      />
      <div className="grid gap-10">
        <CardSkeleton />
      </div>
    </DashboardShell>
  );
}

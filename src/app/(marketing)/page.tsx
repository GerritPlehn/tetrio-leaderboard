import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { Leaderboard } from "@/components/leaderboard";

export const metadata = {
  title: "Leaderboard | SB Tetrio",
  description: "The best scores submitted yet. Get in on the action!",
};

export default async function BillingPage() {
  // const user = await getCurrentUser();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Leaderboard"
        text="The best scores submitted yet. Get in on the action!"
      />
      <div className="grid gap-8">
        <Leaderboard />
      </div>
    </DashboardShell>
  );
}

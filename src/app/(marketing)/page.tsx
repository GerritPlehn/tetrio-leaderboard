import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { Leaderboard } from "@/components/leaderboard";
import Rules from "@/components/rules";
import Participating from "@/components/participating";

export const metadata = {
  title: "Home",
  description: "Storyblok Tetris Challenge Leaderboard",
};

export default async function BillingPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Leaderboard"
        text="The best scores submitted yet. Get in on the action!"
      />
      <div className="grid gap-8">
        <Leaderboard />
      </div>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Rules />
          <Participating />
        </div>
      </section>
    </DashboardShell>
  );
}

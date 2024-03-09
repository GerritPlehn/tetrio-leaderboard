import { redirect } from "next/navigation";

import { authOptions } from "@/server/auth";
import { getCurrentUser } from "@/lib/session";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { ScoreItem } from "@/components/score-item";
import { DashboardShell } from "@/components/shell";
import { api } from "@/trpc/server";
import { ScoreSubmitButton } from "@/components/score-submit-button";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login");
  }

  const scores = await api.score.getPersonal.query();

  return (
    <DashboardShell>
      <DashboardHeader heading="Scores" text="Submit and manage scores.">
        <ScoreSubmitButton />
      </DashboardHeader>
      <div>
        {scores?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {scores.map((score) => (
              <ScoreItem key={score.id} score={score} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No scores created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any scores yet. Start creating content.
            </EmptyPlaceholder.Description>
            <ScoreSubmitButton />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}

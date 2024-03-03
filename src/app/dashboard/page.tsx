import { redirect } from "next/navigation";

import { authOptions } from "@/server/auth";
import { getCurrentUser } from "@/lib/session";
import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { PostItem } from "@/components/post-item";
import { DashboardShell } from "@/components/shell";
import { api } from "@/trpc/server";
import { type Post } from "@/server/api/routers/post";
import { ScoreSubmitButton } from "@/components/score-submit-button";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn ?? "/login");
  }

  const posts: Post[] = await api.post.getSome.query();

  return (
    <DashboardShell>
      <DashboardHeader heading="Posts" text="Create and manage posts.">
        <ScoreSubmitButton />
      </DashboardHeader>
      <div>
        {posts?.length ? (
          <div className="divide-border divide-y rounded-md border">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            <ScoreSubmitButton />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}

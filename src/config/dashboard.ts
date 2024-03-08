import type { DashboardConfig } from "types";

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Leaderboard",
      href: "/",
    },
    {
      title: "My Scores",
      href: "/dashboard",
    },
  ],
  sidebarNav: [
    {
      title: "Scores",
      href: "/dashboard",
      icon: "post",
    },
  ],
} as const;

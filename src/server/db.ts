// Initialize the JS client
import { createClient } from "@supabase/supabase-js";
import { env } from "@/env";

export const db = createClient(env.SUPABASE_URL, env.SUPABASE_KEY, {
  db: { schema: "tetrio_leaderboard" },
});

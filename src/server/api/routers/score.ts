import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { tetrioReplaySchema } from "types/tetrio-replay";
import { type Score, scoreSchema } from "types/score";

export const scoreRouter = createTRPCRouter({
  create: protectedProcedure
    .input(tetrioReplaySchema)
    .mutation(async ({ input, ctx }) => {
      const replay = input;

      const session = ctx.session;
      const player = session?.user.email;
      if (!player) {
        throw new Error("No player given");
      }

      const score: Score = {
        id: replay.endcontext.seed.toString(),
        player,
        replay,
        score: replay.endcontext.score,
        played_at: replay.ts,
        submitted_at: new Date(),
      };

      const insertQuery = await db.from("score").insert(score);

      if (insertQuery.error) {
        throw new Error(insertQuery.error.message);
      }

      return score;
    }),

  getPersonal: protectedProcedure.query(async ({ ctx }) => {
    const session = ctx.session;
    const player = session?.user.email;
    if (!player) {
      throw new Error("No player given");
    }
    const scores = await db
      .from("score")
      .select("id,player,score,played_at,submitted_at")
      .eq("player", player);
    console.log("foooo", scores);
    return scoreSchema.omit({ replay: true }).array().parse(scores.data);
  }),

  getHighscores: protectedProcedure.query(async () => {
    const scores = await db
      .from("score")
      .select("id,player,score,played_at,submitted_at")
      .order("score", { ascending: false })
      .limit(10);
    console.log(scores);
    return scoreSchema.omit({ replay: true }).array().parse(scores.data);
  }),
});

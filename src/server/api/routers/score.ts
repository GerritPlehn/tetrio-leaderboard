import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
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
    const query = await db
      .from("score")
      .select("id,player,score,played_at,submitted_at")
      .eq("player", player);
    return scoreSchema.omit({ replay: true }).array().parse(query.data);
  }),

  getHighscores: protectedProcedure.query(async () => {
    const query = await db
      .from("score")
      .select("id,player,score,played_at,submitted_at")
      .order("score", { ascending: false })
      .limit(10);
    return scoreSchema.omit({ replay: true }).array().parse(query.data);
  }),

  getAnonymousHighscores: publicProcedure.query(async () => {
    const query = await db
      .from("score")
      .select("id,player,score,played_at,submitted_at")
      .order("score", { ascending: false })
      .limit(10);

    const scores = scoreSchema.omit({ replay: true }).array().parse(query.data);

    const pseudoScores = scores.map((score, index) => {
      return {
        ...score,
        player: `Anonymous ${animalNames[index % animalNames.length]}`,
      };
    });
    return pseudoScores;
  }),
});

const animalNames = [
  "Weasel",
  "Meerkat",
  "Snail",
  "Squirrel",
  "Raccoon",
  "Penguin",
  "Tiger",
  "Elephant",
  "Panda",
  "Kangaroo",
  "Lion",
  "Giraffe",
  "Hippo",
  "Rhino",
  "Zebra",
  "Gorilla",
] as const;

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
      const playerId = session?.user.email;
      const playerName = session?.user.name;
      if (!playerId) {
        throw new Error("No player given");
      }

      const score: Score = {
        id: replay.endcontext.seed.toString(),
        player_id: playerId,
        player_name: playerName ?? playerId,
        replay,
        score: replay.endcontext.score,
        played_at: replay.ts,
        submitted_at: new Date(),
      };

      const insertQuery = await db.from("score").insert(score);

      if (insertQuery.error) {
        console.error(insertQuery.error);
        throw insertQuery.error;
      }

      return score;
    }),

  getPersonal: protectedProcedure.query(async ({ ctx }) => {
    const session = ctx.session;
    const playerId = session?.user.email;
    if (!playerId) {
      throw new Error("No player given");
    }
    const query = await db
      .from("score")
      .select("id,player_id,player_name,score,played_at,submitted_at")
      .eq("player_id", playerId)
      .order("played_at", { ascending: false });
    return scoreSchema.omit({ replay: true }).array().parse(query.data);
  }),

  getHighscores: protectedProcedure.query(async () => {
    const query = await db
      .from("highscores")
      .select("id,player_id,player_name,score,played_at,submitted_at")
      .order("score", { ascending: false })
      .limit(10);
    return scoreSchema.omit({ replay: true }).array().parse(query.data);
  }),

  getAnonymousHighscores: publicProcedure.query(async () => {
    const query = await db
      .from("highscores")
      .select("id,player_id,player_name,score,played_at,submitted_at")
      .order("score", { ascending: false })
      .limit(10);

    const scores = scoreSchema.omit({ replay: true }).array().parse(query.data);

    const pseudoScores = scores.map((score, index) => {
      const pseudonym = `Anonymous ${animalNames[index % animalNames.length]}`;
      return {
        ...score,
        player_name: pseudonym,
        player_id: pseudonym,
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

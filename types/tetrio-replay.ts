import { z } from "zod";

export const tetrioReplaySchema = z
  .object({
    endcontext: z
      .object({
        lines: z.number(),
        score: z.number(),
        level: z.number(),
        piecesplaced: z.number(),
        seed: z.number(),
        finesse: z
          .object({
            combo: z.number(),
            faults: z.number(),
            perfectpieces: z.number(),
          })
          .passthrough(),
      })
      .passthrough(),
    ts: z.coerce.date(),
    gametype: z.literal("blitz"),
  })
  .passthrough();

export type TetrioReplay = z.infer<typeof tetrioReplaySchema>;

import { z } from "zod";
import { tetrioReplaySchema } from "./tetrio-replay";

export const scoreSchema = z.object({
  id: z.string(),
  player_id: z.string(),
  player_name: z.string().nullable(),
  replay: tetrioReplaySchema,
  score: z.number(),
  played_at: z.coerce.date(),
  submitted_at: z.coerce.date(),
});

export type Score = z.infer<typeof scoreSchema>;

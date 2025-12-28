import { setSchema } from "./set-schema";

import { z } from "zod";

export const exerciseSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    restTime: z.number(),
    sets: z.array(setSchema),
  })
  .strict();

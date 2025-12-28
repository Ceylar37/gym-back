import { z } from "zod";

export const setSchema = z
  .object({
    weight: z.number(),
    repeatCount: z.number(),
    done: z.boolean(),
  })
  .strict();

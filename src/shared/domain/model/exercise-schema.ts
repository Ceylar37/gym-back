import { setSchema } from "./set-schema";

import { z } from "zod";

export const exerciseSchema = z.object({
  name: z.string(),
  description: z.string(),
  restTime: z.number(),
  sets: z.array(setSchema),
  muscleGroups: z.array(z.string()),
  useCustomSets: z.boolean(),
});
export const exerciseSchemaWithId = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  restTime: z.number(),
  sets: z.array(setSchema),
  muscleGroups: z.array(z.string()),
  useCustomSets: z.boolean(),
});

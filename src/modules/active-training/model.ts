import { exerciseSchema } from "@/shared/domain/model/exercise-schema";

import z from "zod";

const activeTrainingSchema = z
  .object({
    dateStart: z.string(),
    name: z.string(),
    description: z.string(),
    exercises: z.array(exerciseSchema),
  })
  .strict();

export const activeTrainingContract = {
  start: {
    body: z.object({ id: z.string(), dateStart: z.string() }).strict(),
    response: activeTrainingSchema,
  },
  update: {
    body: activeTrainingSchema,
    response: activeTrainingSchema,
  },
  end: {
    body: z.void(),
    response: z.void(),
  },
};

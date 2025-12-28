import z from "zod";

const setSchema = z
  .object({
    weight: z.number(),
    repeatCount: z.number(),
    done: z.boolean(),
  })
  .strict();
const exerciseSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    restTime: z.number(),
    sets: z.array(setSchema),
  })
  .strict();
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

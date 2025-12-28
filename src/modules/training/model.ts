import { CreateUserCrudModel } from "@/shared/user-crud/user-crud.model";
import { createPaginationSchema } from "@/shared/utils/response/create-pagination-schema";

import { z } from "zod";

const trainingSchema = z.object({
  id: z.string(),
  name: z.string(),
  favorite: z.boolean(),
  description: z.string(),
  exerciseTypes: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      favorite: z.boolean(),
      description: z.string(),
      muscleGroups: z.array(z.string()),
      restTime: z.number(),
    })
  ),
});

export const trainingContract = {
  read: {
    response: createPaginationSchema(trainingSchema),
  },
  readOne: {
    response: trainingSchema,
  },
  create: {
    body: z
      .object({
        name: z.string(),
        favorite: z.boolean().optional(),
        description: z.string().optional(),
        exerciseTypeIds: z.array(z.string()).min(1),
      })
      .strict(),
    response: trainingSchema,
  },
  update: {
    body: z
      .object({
        id: z.string(),
        name: z.string().optional(),
        favorite: z.boolean().optional(),
        description: z.string().optional(),
        exerciseTypeIds: z.array(z.string()).min(1),
      })
      .strict(),
    response: trainingSchema,
  },
};

export type TrainingModel = CreateUserCrudModel<{
  base: z.infer<typeof trainingSchema>;
  createArgs: z.infer<typeof trainingContract.create.body>;
  updateArgs: z.infer<typeof trainingContract.update.body>;
}>;

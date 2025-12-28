import { CreateUserCrudModel } from "@/shared/user-crud/user-crud.model";
import { createPaginationSchema } from "@/shared/utils/response/create-pagination-schema";

import { z } from "zod";

const exerciseTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  favorite: z.boolean(),
  description: z.string(),
  restTime: z.number(),
  muscleGroups: z.array(z.string()),
});

export const exerciseTypeContract = {
  read: {
    response: createPaginationSchema(exerciseTypeSchema),
  },
  readOne: {
    response: exerciseTypeSchema,
  },
  create: {
    body: z
      .object({
        name: z.string(),
        favorite: z.boolean().optional(),
        description: z.string().optional(),
        restTime: z.number().optional(),
        muscleGroups: z.array(z.string()).optional(),
      })
      .strict(),
    response: exerciseTypeSchema,
  },
  update: {
    body: z
      .object({
        id: z.string(),
        name: z.string().optional(),
        favorite: z.boolean().optional(),
        description: z.string().optional(),
        restTime: z.number().optional(),
        muscleGroups: z.array(z.string()).optional(),
      })
      .strict(),
    response: exerciseTypeSchema,
  },
};

export type ExerciseTypeModel = CreateUserCrudModel<{
  base: z.infer<typeof exerciseTypeSchema>;
  createArgs: z.infer<typeof exerciseTypeContract.create.body>;
  updateArgs: z.infer<typeof exerciseTypeContract.update.body>;
}>;

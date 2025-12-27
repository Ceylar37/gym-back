import { ExerciseType, Prisma } from "@/generated/prisma";
import { CreateUserCrudModel } from "@/shared/user-crud/user-crud.model";

import { z } from "zod";

export const exerciseTypeContract = {
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
  },
};

export type ExerciseTypeModel = CreateUserCrudModel<{
  base: ExerciseType;
  createArgs: Prisma.ExerciseTypeUncheckedCreateInput;
  updateArgs: Prisma.ExerciseTypeUncheckedUpdateInput;
}>;

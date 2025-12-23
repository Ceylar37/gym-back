import { ExerciseType, Prisma } from "@/generated/prisma";

import { z } from "zod";

export const exerciseTypeContract = {
  create: {
    body: z.object({
      name: z.string(),
      favorite: z.boolean().optional(),
      description: z.string().optional(),
      restTime: z.number().optional(),
      muscleGroups: z.array(z.string()).optional(),
    }),
  },
  update: {
    body: z.object({
      id: z.string(),
      name: z.string().optional(),
      favorite: z.boolean().optional(),
      description: z.string().optional(),
      restTime: z.number().optional(),
      muscleGroups: z.array(z.string()).optional(),
    }),
  },
};

export interface ExerciseTypeModel {
  base: ExerciseType;
  createArgs: Prisma.ExerciseTypeCreateArgs["data"];
  updateArgs: Prisma.ExerciseTypeUpdateArgs["data"] & { id: string };
}

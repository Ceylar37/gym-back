import { createCrudContract } from "@/shared/domain/model/create-crud-contract";
import { CreateUserCrudModel } from "@/shared/user-crud/user-crud.model";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";

import { z } from "zod";

extendZodWithOpenApi(z);

const exerciseTypeSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    favorite: z.boolean(),
    description: z.string(),
    restTime: z.number(),
    muscleGroups: z.array(z.string()),
  })
  .openapi({
    title: "ExerciseType",
  });
const exerciseTypeCreateSchema = z
  .object({
    name: z.string(),
    favorite: z.boolean().optional(),
    description: z.string().optional(),
    restTime: z.number().optional(),
    muscleGroups: z.array(z.string()).optional(),
  })
  .strict()
  .openapi({
    title: "ExerciseTypeCreateBody",
  });
const exerciseTypeUpdateSchema = z
  .object({
    id: z.string(),
    name: z.string().optional(),
    favorite: z.boolean().optional(),
    description: z.string().optional(),
    restTime: z.number().optional(),
    muscleGroups: z.array(z.string()).optional(),
  })
  .strict()
  .openapi({
    title: "ExerciseTypeUpdateBody",
  });

export const exerciseTypeContract = createCrudContract("exercise-type", {
  base: exerciseTypeSchema,
  create: exerciseTypeCreateSchema,
  update: exerciseTypeUpdateSchema,
});

export type ExerciseTypeModel = CreateUserCrudModel<{
  base: z.infer<typeof exerciseTypeSchema>;
  createArgs: z.infer<typeof exerciseTypeContract.create.body>;
  updateArgs: z.infer<typeof exerciseTypeContract.update.body>;
}>;

import { createCrudContract } from "@/shared/domain/model/create-crud-contract";
import { CreateUserCrudModel } from "@/shared/user-crud/user-crud.model";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";

import { z } from "zod";

extendZodWithOpenApi(z);

const trainingSchema = z
  .object({
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
  })
  .openapi({
    title: "Training",
  });
const trainingCreateSchema = z
  .object({
    name: z.string(),
    favorite: z.boolean().optional(),
    description: z.string().optional(),
    exerciseTypes: z
      .array(
        z.object({
          id: z.string(),
        })
      )
      .min(1),
  })
  .openapi({
    title: "TrainingCreateBody",
  });
const trainingUpdateSchema = z
  .object({
    id: z.string(),
    name: z.string().optional(),
    favorite: z.boolean().optional(),
    description: z.string().optional(),
    exerciseTypes: z
      .array(
        z.object({
          id: z.string(),
        })
      )
      .min(1),
  })
  .openapi({
    title: "TrainingUpdateBody",
  });

export const trainingContract = createCrudContract("training", {
  base: trainingSchema,
  create: trainingCreateSchema,
  update: trainingUpdateSchema,
});

export type TrainingModel = CreateUserCrudModel<{
  base: z.infer<typeof trainingSchema>;
  createArgs: z.infer<typeof trainingContract.create.body>;
  updateArgs: z.infer<typeof trainingContract.update.body>;
}>;

import { createCrudContract } from "@/shared/domain/model/create-crud-contract";
import { exerciseSchema } from "@/shared/domain/model/exercise-schema";
import { CreateUserCrudModel } from "@/shared/user-crud/user-crud.model";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";

import { z } from "zod";

extendZodWithOpenApi(z);

const trainingHistorySchema = z
  .object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    exercises: z.array(exerciseSchema),
    dateStart: z.string(),
  })
  .openapi({ title: "TrainingHistory" });
const trainingHistoryCreateSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    exercises: z.array(exerciseSchema),
    dateStart: z.string(),
  })
  .strict()
  .openapi({ title: "TrainingHistoryCreate" });
const trainingHistoryUpdateSchema = trainingHistorySchema.strict().openapi({
  title: "TrainingHistoryUpdate",
});

export const _trainingHistoryContract = createCrudContract("training-history", {
  base: trainingHistorySchema,
  create: trainingHistoryCreateSchema,
  update: trainingHistoryUpdateSchema,
});

export const trainingHistoryContract = {
  read: _trainingHistoryContract.read,
  readOne: _trainingHistoryContract.readOne,
  update: _trainingHistoryContract.update,
  delete: _trainingHistoryContract.delete,
};

export type TrainingHistoryModel = CreateUserCrudModel<{
  base: z.infer<typeof trainingHistorySchema>;
  createArgs: z.infer<typeof _trainingHistoryContract.create.body>;
  updateArgs: z.infer<typeof trainingHistoryContract.update.body>;
}>;

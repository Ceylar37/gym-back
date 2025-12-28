import { exerciseSchema } from "@/shared/domain/model/exercise-schema";
import { CreateUserCrudModel } from "@/shared/user-crud/user-crud.model";
import { createPaginationSchema } from "@/shared/utils/response/create-pagination-schema";

import { z } from "zod";

const trainingHistorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  exercises: z.array(exerciseSchema),
  dateStart: z.string(),
});

export const trainingHistoryContract = {
  read: {
    response: createPaginationSchema(trainingHistorySchema),
  },
  readOne: {
    response: trainingHistorySchema,
  },
  create: {
    body: z
      .object({
        name: z.string(),
        description: z.string(),
        exercises: z.array(exerciseSchema),
        dateStart: z.string(),
      })
      .strict(),
    response: trainingHistorySchema,
  },
  update: {
    body: trainingHistorySchema.strict(),
    response: trainingHistorySchema,
  },
};

export type TrainingHistoryModel = CreateUserCrudModel<{
  base: z.infer<typeof trainingHistorySchema>;
  createArgs: z.infer<typeof trainingHistoryContract.create.body>;
  updateArgs: z.infer<typeof trainingHistoryContract.update.body>;
}>;

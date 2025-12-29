import { ErrorCode } from "@/shared/base/error-code";
import { exerciseSchema } from "@/shared/domain/model/exercise-schema";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";

import z from "zod";

extendZodWithOpenApi(z);

const activeTrainingSchema = z
  .object({
    dateStart: z.string(),
    name: z.string(),
    description: z.string(),
    exercises: z.array(exerciseSchema),
  })
  .strict()
  .openapi({
    title: "ActiveTraining",
  });

export const activeTrainingContract = {
  get: {
    method: "GET" as const,
    path: "/api/active-training",
    responses: {
      200: activeTrainingSchema,
      404: z.enum([ErrorCode.NotFound]),
    },
  },
  start: {
    method: "POST" as const,
    path: "/api/active-training/start",
    body: z.object({ id: z.string(), dateStart: z.string() }).strict().openapi({
      title: "ActiveTrainingStartBody",
    }),
    responses: {
      200: activeTrainingSchema,
      404: z.enum([ErrorCode.NotFound]),
      400: z.enum([ErrorCode.AlreadyExists]),
    },
  },
  update: {
    method: "PATCH" as const,
    path: "/api/active-training/update",
    body: activeTrainingSchema,
    responses: {
      200: activeTrainingSchema,
      404: z.enum([ErrorCode.NotFound]),
    },
  },
  end: {
    method: "POST" as const,
    path: "/api/active-training/end",
    body: z.void(),
    responses: {
      200: z.void(),
      404: z.enum([ErrorCode.NotFound]),
    },
  },
};

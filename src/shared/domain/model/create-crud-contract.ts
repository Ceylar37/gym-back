import { ErrorCode } from "@/shared/base/error-code";
import { createPaginationSchema } from "@/shared/utils/response/create-pagination-schema";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";

import { z } from "zod";

extendZodWithOpenApi(z);

export const createCrudContract = <
  B extends z.ZodSchema,
  C extends z.ZodSchema,
  U extends z.ZodSchema
>(
  path: string,
  options: { base: B; create: C; update: U }
) => ({
  create: {
    method: "POST" as const,
    path: `/api/${path}`,
    body: options.create,
    responses: {
      200: options.base,
      422: z.string(),
    },
  },
  read: {
    method: "GET" as const,
    path: `/api/${path}`,
    query: z
      .object({
        filter: z.string().optional(),
        page: z.number().optional(),
        limit: z.number().optional(),
      })
      .openapi({
        title: "ReadParams",
      }),
    responses: {
      200: createPaginationSchema(options.base),
      422: z.string(),
    },
  },
  readOne: {
    method: "GET" as const,
    path: `/api/${path}/:id`,
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: options.base,
      404: z.enum([ErrorCode.NotFound]),
    },
  },
  update: {
    method: "PUT" as const,
    path: `/api/${path}`,
    body: options.update,
    responses: {
      200: options.base,
      422: z.string(),
    },
  },
  delete: {
    method: "DELETE" as const,
    path: `/api/${path}/:id`,
    pathParams: z.object({ id: z.string() }),
    responses: {
      200: z.void(),
      404: z.enum([ErrorCode.NotFound]),
    },
  },
});

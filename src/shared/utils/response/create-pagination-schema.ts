import { z } from "zod";

export const createPaginationSchema = (schema: z.ZodSchema) => {
  return z.object({
    content: z.array(schema),
    meta: z.object({
      limit: z.number(),
      page: z.number(),
      pages: z.number(),
    }),
  });
};

import { MetaSchema } from "@/shared/domain/model/meta";

import { z } from "zod";

export const createPaginationSchema = (schema: z.ZodSchema) => {
  return z.object({
    content: z.array(schema),
    meta: MetaSchema,
  });
};

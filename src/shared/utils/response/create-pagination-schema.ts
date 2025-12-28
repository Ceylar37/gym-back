import { MetaSchema } from "@/shared/domain/model/meta";

import { z } from "zod";

export const createPaginationSchema = <Schema extends z.ZodSchema>(
  schema: Schema
) => {
  return z.object({
    content: z.array(schema),
    meta: MetaSchema,
  });
};

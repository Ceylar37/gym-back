import { z } from "zod";

export const MetaSchema = z.object({
  limit: z.number().optional(),
  page: z.number().optional(),
  pages: z.number().optional(),
});

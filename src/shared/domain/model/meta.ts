import { z } from "zod";

export const MetaSchema = z.object({
  limit: z.number(),
  page: z.number(),
  pages: z.number(),
});

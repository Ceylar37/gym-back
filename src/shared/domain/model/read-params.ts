import { z } from "zod";

export const readParamsSchema = z.object({
  limit: z.coerce.number().min(0).optional(),
  page: z.coerce.number().min(1).optional(),
  filter: z.string().optional(),
});

export type ReadArgs = {
  limit?: number | undefined;
  page?: number | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  filter?: any;
};

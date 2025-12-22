import { RequestWithBody } from "@/types/request-with-body";

import z, { ZodSchema } from "zod";

export const validateBody = <T extends ZodSchema>(
  cb: (req: RequestWithBody<z.infer<T>>) => Promise<Response>,
  schema: T
) => {
  return async (req: Request) => {
    const clone = req.clone();
    const body = await clone.json();

    const { success, error } = schema.safeParse(body);
    if (!success) {
      return new Response(JSON.stringify(error), { status: 400 });
    }
    return cb(req);
  };
};

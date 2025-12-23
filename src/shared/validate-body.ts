import { RequestWithBody } from "@/types/request-with-body";

import z, { ZodSchema } from "zod";

export const validateBody = <T extends ZodSchema>(
  cb: (req: RequestWithBody<z.infer<T>>) => Promise<Response>,
  schema: T
) => {
  return async (req: Request) => {
    const clone = req.clone();
    try {
      const body = await clone.json();
      const { success, error } = schema.safeParse(body);
      if (!success) {
        return new Response(
          `${error.issues[0].path}: ${error.issues[0].message}`,
          { status: 400 }
        );
      }
      return cb(req);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "message" in error) {
        return new Response(JSON.stringify(error.message), { status: 400 });
      }
      return new Response(JSON.stringify(error), { status: 400 });
    }
  };
};

import { RequestWithBody } from "@/types/request-with-body";

import { NextResponse } from "next/server";
import z, { ZodSchema } from "zod";

export const withBody = <
  T extends ZodSchema,
  Args extends unknown[] = unknown[]
>(
  cb: (
    req: RequestWithBody<z.infer<T>>,
    ...restArgs: Args
  ) => Promise<Response>,
  schema: T
) => {
  return async (req: Request, ...restArgs: Args) => {
    const clone = req.clone();
    try {
      const body = await clone.json();
      const { success, error } = schema.safeParse(body);
      if (!success) {
        return new NextResponse(
          `${error.issues[0].path}: ${error.issues[0].message}`,
          { status: 422 }
        );
      }
      return cb(req, ...restArgs);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "message" in error) {
        return new NextResponse(JSON.stringify(error.message), { status: 422 });
      }
      return new NextResponse(JSON.stringify(error), { status: 422 });
    }
  };
};

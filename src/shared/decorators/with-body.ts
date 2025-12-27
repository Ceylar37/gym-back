import { validateBody } from "../utils/request/validate-body";

import { NextRequest } from "next/server";
import z from "zod";

export type RequestWithBody<
  Request extends NextRequest,
  Schema extends z.ZodSchema
> = Request & {
  getBody: () => z.infer<Schema>;
};

export const withBody = <Schema extends z.ZodSchema>(schema: Schema) => {
  return <Request extends NextRequest>(
    cb: (req: RequestWithBody<Request, Schema>) => Promise<Response>
  ) => {
    return async (req: Request) => {
      const body = await validateBody(req, schema);
      return cb(Object.assign(req, { getBody: () => body }));
    };
  };
};

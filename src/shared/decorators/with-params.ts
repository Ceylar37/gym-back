import { validateParams } from "../utils/request/validate-params";

import { NextRequest } from "next/server";
import z, { ZodSchema } from "zod";

export type RequestWithParams<Request extends NextRequest> = Request & {
  getParams: () => z.infer<ZodSchema>;
};

export const withParams = <Request extends NextRequest, T extends ZodSchema>(
  schema: T,
  cb: (req: RequestWithParams<Request>) => Promise<Response>
) => {
  return async (req: Request) => {
    const body = await validateParams(req, schema);
    return cb(Object.assign(req, { getParams: () => body }));
  };
};

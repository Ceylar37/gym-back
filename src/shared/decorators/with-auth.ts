import { User } from "@/generated/prisma/client";

import { validateAuth } from "../utils/request/validate-auth";

import { NextRequest, NextResponse } from "next/server";

export type RequestWithUser<Request extends NextRequest> = Request & {
  getUser: () => User;
};

export const withAuth = <Request extends NextRequest>(
  cb: (req: RequestWithUser<Request>) => Promise<NextResponse>
) => {
  return async (req: Request) => {
    const user = await validateAuth(req);
    return cb(Object.assign(req, { getUser: () => user }));
  };
};

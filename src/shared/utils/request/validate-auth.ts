import user from "@/modules/user";
import { BaseError } from "@/shared/base/base-error";
import { ErrorCode } from "@/shared/base/error-code";

import { NextRequest } from "next/server";

export const validateAuth = async <Request extends NextRequest>(
  req: Request
) => {
  const authorization = req.headers.get("Authorization");
  if (!authorization) {
    throw new BaseError(ErrorCode.Unauthorized, 401);
  }

  const token = authorization.split(" ")[1];
  if (!token) {
    throw new BaseError(ErrorCode.Unauthorized, 401);
  }
  return await user.service.verifyUserByAccessToken(token);
};

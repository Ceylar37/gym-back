import { User } from "@/generated/prisma/client";
import user from "@/modules/user";

import { BaseError } from "../base/base-error";
import { ErrorCode } from "../base/error-code";

export const withAuth = <T extends Request>(
  cb: (req: T, user: User) => Promise<Response>
) => {
  return async (req: T) => {
    const authorization = req.headers.get("Authorization");
    if (!authorization) {
      throw new BaseError(ErrorCode.Unauthorized, 401);
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      throw new BaseError(ErrorCode.Unauthorized, 401);
    }
    // try {
    const userFromDb = await user.service.verifyUserByAccessToken(token);
    return cb(req, userFromDb);
    // } catch (error) {
    //   console.log(error);
    //   // return new Response(JSON.stringify({ message: "Unauthorized" }), {
    //   //     status: 401,
    //   //   });
    // }
  };
};

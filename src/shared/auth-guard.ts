import { User } from "@/generated/prisma/client";
import { UserService } from "@/modules/user/user.service";
import prisma from "@/shared/prisma";

export const authGuard = (
  cb: (req: Request, user: User) => Promise<Response>
) => {
  return async (req: Request) => {
    const token = req.headers.get("Authorization");
    if (!token) {
      return new Response(JSON.stringify({ message: "Unauthorized" }), {
        status: 401,
      });
    }
    // try {
    const userFromDb = await new UserService(
      prisma.user
    ).verifyUserByAccessToken(token);
    return cb(req, userFromDb);
    // } catch (error) {
    //   console.log(error);
    //   // return new Response(JSON.stringify({ message: "Unauthorized" }), {
    //   //     status: 401,
    //   //   });
    // }
  };
};

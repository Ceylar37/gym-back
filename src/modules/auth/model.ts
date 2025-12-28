import { ErrorCode } from "@/shared/base/error-code";
import { extendZodWithOpenApi } from "@anatine/zod-openapi";

import z from "zod";

extendZodWithOpenApi(z);

const tokensPair = z
  .object({ accessToken: z.string(), refreshToken: z.string() })
  .openapi({
    title: "TokensPair",
  });

export const authContract = {
  login: {
    method: "POST" as const,
    path: "/api/auth/login",
    body: z
      .object({ email: z.string(), password: z.string() })
      .strict()
      .openapi({
        title: "AuthLoginBody",
      }),
    responses: {
      200: tokensPair,
      401: z.enum([ErrorCode.InvalidCredentials]),
    },
  },
  register: {
    method: "POST" as const,
    path: "/api/auth/register",
    body: z
      .object({ email: z.string(), password: z.string() })
      .strict()
      .openapi({
        title: "AuthRegisterBody",
      }),
    responses: {
      200: tokensPair,
      400: z.enum([ErrorCode.AlreadyExists]),
    },
  },
  refresh: {
    method: "POST" as const,
    path: "/api/auth/refresh",
    body: z.object({ refreshToken: z.string() }).strict().openapi({
      title: "AuthRefreshBody",
    }),
    responses: {
      200: tokensPair,
      401: z.enum([ErrorCode.Unauthorized]),
    },
  },
  profile: {
    method: "GET" as const,
    path: "/api/auth/profile",
    responses: {
      200: z
        .object({
          id: z.string(),
          email: z.string(),
        })
        .openapi({ title: "Profile" }),
      401: z.enum([ErrorCode.Unauthorized]),
    },
  },
};

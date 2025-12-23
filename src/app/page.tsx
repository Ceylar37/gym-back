import { authContract } from "@/modules/auth";
import { ErrorCode } from "@/shared/base/error-code";
import { initContract } from "@ts-rest/core";
import { generateOpenApi } from "@ts-rest/open-api";

import "swagger-ui-react/swagger-ui.css";

import SwaggerUI from "swagger-ui-react";
import z from "zod";

const contract = initContract().router({
  auth: {
    login: {
      method: "POST",
      path: "/api/auth/login",
      body: authContract.login,
      responses: {
        200: z.object({ accessToken: z.string(), refreshToken: z.string() }),
        401: z.enum([ErrorCode.InvalidCredentials]),
      },
    },
    register: {
      method: "POST",
      path: "/api/auth/register",
      body: authContract.register,
      responses: {
        200: z.object({ accessToken: z.string(), refreshToken: z.string() }),
        400: z.enum([ErrorCode.AlreadyExists]),
      },
    },
    refresh: {
      method: "POST",
      path: "/api/auth/refresh",
      body: authContract.refresh,
      responses: {
        200: z.object({ accessToken: z.string(), refreshToken: z.string() }),
        401: z.enum([ErrorCode.Unauthorized]),
      },
    },
  },
});

const openApiDocument = generateOpenApi(contract, {
  info: {
    title: "Auth API",
    version: "1.0.0",
  },
});

export default function Home() {
  return <SwaggerUI spec={openApiDocument} />;
}

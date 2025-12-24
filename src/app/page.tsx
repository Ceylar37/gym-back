import { authContract } from "@/modules/auth";
import { exerciseTypeContract } from "@/modules/exercise-type/exercise-type.model";
import { ErrorCode } from "@/shared/base/error-code";
import { initContract } from "@ts-rest/core";
import { generateOpenApi } from "@ts-rest/open-api";

import packageJson from "../../package.json";

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
    profile: {
      method: "GET",
      path: "/api/auth/profile",
      responses: {
        200: z.object({
          id: z.string(),
          email: z.string(),
        }),
        401: z.enum([ErrorCode.Unauthorized]),
      },
    },
  },
  "exercise-type": {
    create: {
      method: "POST",
      path: "/api/exercise-type",
      body: exerciseTypeContract.create.body,
      responses: {
        200: z.object({
          id: z.string(),
          name: z.string(),
          favorite: z.boolean(),
          description: z.string(),
          restTime: z.number(),
          muscleGroups: z.array(z.string()),
        }),
        422: z.string(),
      },
    },
    read: {
      method: "GET",
      path: "/api/exercise-type",
      responses: {
        200: z.object({
          content: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              favorite: z.boolean(),
              description: z.string(),
              restTime: z.number(),
              muscleGroups: z.array(z.string()),
            })
          ),
          meta: z.object({
            page: z.number(),
            size: z.number(),
            limit: z.number(),
          }),
        }),
      },
    },
    readOne: {
      method: "GET",
      path: "/api/exercise-type/:id",
      pathParams: z.object({ id: z.string() }),
      responses: {
        200: z.object({
          id: z.string(),
          name: z.string(),
          favorite: z.boolean(),
          description: z.string(),
          restTime: z.number(),
          muscleGroups: z.array(z.string()),
        }),
        404: z.enum([ErrorCode.NotFound]),
      },
    },
    update: {
      method: "PUT",
      path: "/api/exercise-type",
      body: exerciseTypeContract.update.body,
      responses: {
        200: z.object({
          id: z.string(),
          name: z.string(),
          favorite: z.boolean(),
          description: z.string(),
          restTime: z.number(),
          muscleGroups: z.array(z.string()),
        }),
        422: z.string(),
      },
    },
    delete: {
      method: "DELETE",
      path: "/api/exercise-type/:id",
      pathParams: z.object({ id: z.string() }),
      responses: {
        200: z.object({ id: z.string() }),
        404: z.enum([ErrorCode.NotFound]),
        422: z.string(),
      },
    },
  },
});

const openApiDocument = generateOpenApi(contract, {
  info: {
    title: "Auth API",
    version: packageJson.version,
  },
});

export default function Home() {
  return <SwaggerUI spec={openApiDocument} />;
}

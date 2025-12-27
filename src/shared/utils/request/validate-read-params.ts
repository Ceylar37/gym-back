import { BaseError } from "@/shared/base/base-error";
import { ReadArgs, readParamsSchema } from "@/shared/domain/model/read-params";

import { NextRequest } from "next/server";
import z from "zod";

export const validateReadParams = <Request extends NextRequest>(
  req: Request
): ReadArgs => {
  const params = req.nextUrl.searchParams;

  try {
    const data = readParamsSchema.parse(Object.fromEntries(params.entries()));

    if (data.filter) {
      data.filter = JSON.parse(data.filter);
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      throw new BaseError(
        `${error.issues[0].path}: ${error.issues[0].message}`,
        422
      );
    }
    if (error && typeof error === "object" && "message" in error) {
      throw new BaseError(JSON.stringify(error.message), 422);
    }
    throw new BaseError(JSON.stringify(error), 422);
  }
};

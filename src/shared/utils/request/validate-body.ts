import { BaseError } from "@/shared/base/base-error";

import { NextRequest } from "next/server";
import z, { ZodSchema } from "zod";

export const validateBody = async <
  Request extends NextRequest,
  Schema extends ZodSchema
>(
  req: Request,
  schema: Schema
): Promise<z.infer<Schema>> => {
  const clone = req.clone();
  try {
    const body = await clone.json();
    return schema.parse(body);
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

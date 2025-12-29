import { extendZodWithOpenApi } from "@anatine/zod-openapi";

import { ErrorCode } from "./error-code";

import { z } from "zod";

extendZodWithOpenApi(z);

export class BaseError extends Error {
  public status: number;

  constructor(message: ErrorCode | string, status: number) {
    super(message);
    this.status = status;
  }
}

export const baseErrorSchema = z
  .object({ message: z.string(), status: z.number() })
  .openapi({ title: "BaseError" });

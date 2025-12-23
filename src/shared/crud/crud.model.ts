import { ZodSchema } from "zod";

export interface CrudModel {
  base: unknown;
  createArgs: unknown;
  updateArgs: unknown;
}

export interface CrudContract {
  create: {
    body: ZodSchema;
  };
  update: {
    body: ZodSchema;
  };
}

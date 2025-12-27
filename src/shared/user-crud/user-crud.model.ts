import { Prisma } from "@/generated/prisma";

import { CrudModel } from "../crud/crud.model";

import { ZodSchema } from "zod";

export interface UserCrudModel {
  base: unknown;
  createArgs: {
    userId: string | Prisma.StringFieldUpdateOperationsInput | undefined;
  };
  updateArgs: {
    userId: string | Prisma.StringFieldUpdateOperationsInput | undefined;
  };
}

export interface CreateUserCrudModel<T extends CrudModel> {
  base: T["base"];
  createArgs: T["createArgs"] & {
    userId: string;
  };
  updateArgs: T["updateArgs"] & {
    id: string;
    userId: string;
  };
}

export interface UserCrudContract {
  create: {
    body: ZodSchema;
  };
  update: {
    body: ZodSchema;
  };
}

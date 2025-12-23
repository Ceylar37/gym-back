import { authGuard } from "../auth-guard";
import { BaseController } from "../base/base.controller";
import { BaseError } from "../base/base-error";
import { controllerDecorator } from "../base/controller-decorator";
import { ErrorCode } from "../base/error-code";
import { validateBody } from "../validate-body";

import { CrudContract, CrudModel } from "./crud.model";

import { NextResponse } from "next/server";

export interface CrudService<T extends CrudModel> {
  create: (data: T["createArgs"]) => Promise<T["base"]>;
  read: (userId: string) => Promise<T["base"][]>;
  readOne: (id: string) => Promise<T["base"]>;
  update: (data: T["updateArgs"]) => Promise<T["base"]>;
  delete: (id: string) => Promise<void>;
}

export const CrudController = controllerDecorator(
  class CrudController<T extends CrudModel> extends BaseController {
    constructor(
      private readonly service: CrudService<T>,
      private readonly crudContract: CrudContract
    ) {
      super();
    }

    create = validateBody(
      authGuard(async (req, user) => {
        const body = await req.json();
        return NextResponse.json(
          await this.service.create({ ...body, userId: user.id })
        );
      }),
      this.crudContract.create.body
    );

    read = authGuard(async (req, user) => {
      return NextResponse.json({
        content: await this.service.read(user.id),
        meta: {
          limit: 25,
          page: 1,
          pages: 10,
        },
      });
    });

    readOne = authGuard(async (req) => {
      const id = req.url.split("/").pop();
      if (!id) {
        throw new BaseError(ErrorCode.NotUrlIdProvided, 422);
      }
      return NextResponse.json(await this.service.readOne(id));
    });

    update = validateBody(
      authGuard(async (req) => {
        const body = await req.json();
        return NextResponse.json(await this.service.update(body));
      }),
      this.crudContract.update.body
    );

    delete = authGuard(async (req) => {
      const id = req.url.split("/").pop();
      if (!id) {
        throw new BaseError(ErrorCode.NotUrlIdProvided, 422);
      }
      await this.service.delete(id);
      return new NextResponse();
    });
  }
);

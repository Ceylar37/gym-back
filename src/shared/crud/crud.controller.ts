import { BaseController } from "@/shared/base/base.controller";
import { BaseError } from "@/shared/base/base-error";
import { controllerDecorator } from "@/shared/base/controller-decorator";
import { ErrorCode } from "@/shared/base/error-code";
import { withAuth } from "@/shared/decorators/with-auth";
import { withBody } from "@/shared/decorators/with-body";

import { CrudContract, CrudModel } from "./crud.model";

import { NextResponse } from "next/server";

export interface CrudService<T extends CrudModel> {
  create: (data: T["createArgs"]) => Promise<T["base"]>;
  read: () => Promise<T["base"][]>;
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

    create = withAuth(async (req: Request) => {
      const body = await req.json();
      return NextResponse.json(await this.service.create(body));
    });

    read = withAuth(async () => {
      return NextResponse.json({
        content: await this.service.read(),
        meta: {
          limit: 25,
          page: 1,
          pages: 10,
        },
      });
    });

    readOne = withAuth(async (req) => {
      const id = req.url.split("/").pop();
      if (!id) {
        throw new BaseError(ErrorCode.NotUrlIdProvided, 422);
      }
      return NextResponse.json(await this.service.readOne(id));
    });

    update = withAuth(
      withBody(this.crudContract.update.body)(async (req) => {
        const body = await req.json();
        return NextResponse.json(await this.service.update(body));
      })
    );

    delete = withAuth(async (req) => {
      const id = req.url.split("/").pop();
      if (!id) {
        throw new BaseError(ErrorCode.NotUrlIdProvided, 422);
      }
      await this.service.delete(id);
      return new NextResponse();
    });
  }
);

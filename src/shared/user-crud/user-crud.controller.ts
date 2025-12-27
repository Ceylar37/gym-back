import { BaseController } from "@/shared/base/base.controller";
import { BaseError } from "@/shared/base/base-error";
import { controllerDecorator } from "@/shared/base/controller-decorator";
import { ErrorCode } from "@/shared/base/error-code";
import { withAuth } from "@/shared/decorators/with-auth";
import { withBody } from "@/shared/decorators/with-body";
import { ReadArgs } from "@/shared/domain/model/read-params";
import { validateBody } from "@/shared/utils/request/validate-body";
import { validateReadParams } from "@/shared/utils/request/validate-read-params";

import { UserCrudContract, UserCrudModel } from "./user-crud.model";

import { NextResponse } from "next/server";

export interface UserCrudService<T extends UserCrudModel> {
  create: (data: T["createArgs"]) => Promise<T["base"]>;
  read: (
    userId: string,
    args: ReadArgs
  ) => Promise<{
    content: T["base"][];
    meta: {
      limit?: number | undefined;
      page?: number | undefined;
      pages?: number | undefined;
    };
  }>;
  readOne: (id: string) => Promise<T["base"]>;
  update: (data: T["updateArgs"]) => Promise<T["base"]>;
  delete: (id: string) => Promise<void>;
}

export const UserCrudController = controllerDecorator(
  class UserCrudController<T extends UserCrudModel> extends BaseController {
    constructor(
      private readonly service: UserCrudService<T>,
      private readonly userCrudContract: UserCrudContract
    ) {
      super();
    }

    create = withAuth(async (req) => {
      const body = await validateBody(req, this.userCrudContract.create.body);
      return NextResponse.json(
        await this.service.create({ ...body, userId: req.getUser().id })
      );
    });

    read = withAuth(async (req) => {
      const readParams = validateReadParams(req);
      return NextResponse.json(
        await this.service.read(req.getUser().id, readParams)
      );
    });

    readOne = withAuth(async (req) => {
      const id = req.url.split("/").pop();
      if (!id) {
        throw new BaseError(ErrorCode.NotUrlIdProvided, 422);
      }
      return NextResponse.json(await this.service.readOne(id));
    });

    update = withAuth(
      withBody(this.userCrudContract.update.body)(async (req) => {
        const body = await req.json();
        await this.service.readOne(body.id);
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

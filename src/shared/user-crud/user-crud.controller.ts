import { BaseController } from "../base/base.controller";
import { BaseError } from "../base/base-error";
import { controllerDecorator } from "../base/controller-decorator";
import { ErrorCode } from "../base/error-code";
import { withAuth } from "../decorators/with-auth";
import { withBody } from "../decorators/with-body";

import { UserCrudContract, UserCrudModel } from "./user-crud.model";

import { NextResponse } from "next/server";

export interface UserCrudService<T extends UserCrudModel> {
  create: (data: T["createArgs"]) => Promise<T["base"]>;
  read: (userId: string) => Promise<T["base"][]>;
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

    create = withAuth(async (req: Request, user) => {
      const body = await req.json();
      return NextResponse.json(
        await this.service.create({ ...body, userId: user.id })
      );
    });

    read = withAuth(async (req, user) => {
      return NextResponse.json({
        content: await this.service.read(user.id),
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
      withBody(this.userCrudContract.update.body)(async (req) => {
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

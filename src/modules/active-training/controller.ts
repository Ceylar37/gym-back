import { BaseController } from "@/shared/base/base.controller";
import { controllerDecorator } from "@/shared/base/controller-decorator";
import { withAuth } from "@/shared/decorators/with-auth";
import { validateBody } from "@/shared/utils/request/validate-body";

import { activeTrainingContract } from "./model";
import { ActiveTrainingService } from "./service";

import { NextResponse } from "next/server";

export const ActiveTrainingController = controllerDecorator(
  class ActiveTrainingController extends BaseController {
    constructor(private readonly activeTrainingService: ActiveTrainingService) {
      super();
    }

    start = withAuth(async (req) => {
      const body = await validateBody(req, activeTrainingContract.start.body);
      return NextResponse.json(
        await this.activeTrainingService.start({
          ...body,
          userId: req.getUser().id,
        })
      );
    });

    update = withAuth(async (req) => {
      const body = await validateBody(req, activeTrainingContract.update.body);
      return NextResponse.json(
        await this.activeTrainingService.updateActiveTraining({
          ...body,
          userId: req.getUser().id,
        })
      );
    });

    end = withAuth(async (req) => {
      await this.activeTrainingService.end({ userId: req.getUser().id });
      return new NextResponse();
    });

    get = withAuth(async (req) => {
      return NextResponse.json(
        await this.activeTrainingService.getActiveTraining(req.getUser().id)
      );
    });
  }
);

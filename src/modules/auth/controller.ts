import { BaseController } from "@/shared/base/base.controller";
import { controllerDecorator } from "@/shared/base/controller-decorator";
import { withAuth } from "@/shared/decorators/with-auth";
import { withBody } from "@/shared/decorators/with-body";

import { authContract } from "./model";
import { AuthService } from "./service";

import { NextResponse } from "next/server";

export const AuthController = controllerDecorator(
  class AuthController extends BaseController {
    constructor(private readonly authService: AuthService) {
      super();
    }

    register = withBody(authContract.register.body)(async (req) => {
      const tokens = await this.authService.register(req.getBody());
      return NextResponse.json(tokens);
    });

    login = withBody(authContract.login.body)(async (req) => {
      const tokens = await this.authService.login(req.getBody());
      return NextResponse.json(tokens);
    });

    refresh = withBody(authContract.refresh.body)(async (req) => {
      const { refreshToken } = req.getBody();
      const tokens = await this.authService.refresh(refreshToken);
      return NextResponse.json(tokens);
    });

    profile = withAuth(async (req) => {
      const userData = {
        id: req.getUser().id,
        email: req.getUser().email,
      };
      return NextResponse.json(userData);
    });
  }
);

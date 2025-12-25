import { withAuth } from "@/shared/decorators/with-auth";
import { withBody } from "@/shared/decorators/with-body";

import { BaseController } from "../../shared/base/base.controller";
import { controllerDecorator } from "../../shared/base/controller-decorator";

import { authContract } from "./auth.model";
import { AuthService } from "./auth.service";

import { NextResponse } from "next/server";

export const AuthController = controllerDecorator(
  class AuthController extends BaseController {
    constructor(private readonly authService: AuthService) {
      super();
    }

    register = withBody(authContract.register.body)(async (req) => {
      const user = await req.json();
      const tokens = await this.authService.register(user);
      return NextResponse.json(tokens);
    });

    login = withBody(authContract.login.body)(async (req) => {
      const { email, password } = await req.json();
      const tokens = await this.authService.login({ email, password });
      return NextResponse.json(tokens);
    });

    refresh = withBody(authContract.refresh.body)(async (req) => {
      const { refreshToken } = await req.json();
      const tokens = await this.authService.refresh(refreshToken);
      return NextResponse.json(tokens);
    });

    profile = withAuth(async (req, user) => {
      const userData = {
        id: user.id,
        email: user.email,
      };

      return NextResponse.json(userData);
    });
  }
);

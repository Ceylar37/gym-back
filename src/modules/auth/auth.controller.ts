import { validateBody } from "@/shared/validate-body";

import { BaseController } from "../../shared/base/base.controller";
import { controllerDecorator } from "../../shared/base/controller-decorator";

import { authContract } from "./auth.contract";
import { AuthService } from "./auth.service";

import { NextResponse } from "next/server";

export const AuthController = controllerDecorator(
  class AuthController extends BaseController {
    constructor(private readonly authService: AuthService) {
      super();
    }

    register = validateBody(async (req) => {
      const user = await req.json();

      const tokens = await this.authService.register(user);

      return NextResponse.json(tokens, { status: 200 });
    }, authContract.register);

    login = validateBody(async (req) => {
      const { email, password } = await req.json();

      const tokens = await this.authService.login({ email, password });

      return NextResponse.json(tokens, { status: 200 });
    }, authContract.login);

    refresh = validateBody(async (req) => {
      const { refreshToken } = await req.json();

      const tokens = await this.authService.refresh(refreshToken);

      return NextResponse.json(tokens, { status: 200 });
    }, authContract.refresh);
  }
);

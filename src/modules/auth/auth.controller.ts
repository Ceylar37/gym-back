import { validateBody } from "@/shared/validate-body";
import { BaseResponse } from "@/types/base-response";

import { BaseController } from "../../shared/base/base.controller";
import { controllerDecorator } from "../../shared/base/controller-decorator";

import { AuthService } from "./auth.service";

import z from "zod";

export const authContract = {
  login: z.object({ email: z.string(), password: z.string() }),
  register: z.object({ email: z.string(), password: z.string() }),
  refresh: z.object({ refreshToken: z.string() }),
};

export const AuthController = controllerDecorator(
  class AuthController extends BaseController {
    constructor(private readonly authService: AuthService) {
      super();
    }

    register = validateBody(async (req) => {
      const user = await req.json();

      const tokens = await this.authService.register(user);

      return new BaseResponse(tokens, { status: 200 });
    }, authContract.register);

    login = validateBody(async (req) => {
      const { email, password } = await req.json();

      const tokens = await this.authService.login({ email, password });

      return new BaseResponse(tokens, { status: 200 });
    }, authContract.login);

    refresh = validateBody(async (req) => {
      const { refreshToken } = await req.json();

      const tokens = await this.authService.refresh(refreshToken);

      return new BaseResponse(tokens, { status: 200 });
    }, authContract.refresh);
  }
);

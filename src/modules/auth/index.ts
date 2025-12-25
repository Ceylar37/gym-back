import user from "@/modules/user";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const authService = new AuthService(user.service);
const authController = new AuthController(authService);
const auth = {
  service: authService,
  controller: authController,
};

export default auth;
export { authContract } from "./auth.model";

import user from "@/modules/user";

import { AuthController } from "./controller";
import { AuthService } from "./service";

const authService = new AuthService(user.service);
const authController = new AuthController(authService);
const auth = {
  service: authService,
  controller: authController,
};

export default auth;
export { authContract } from "./model";

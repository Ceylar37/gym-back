import prisma from "@/shared/domain/prisma";

import { UserService } from "../user/user.service";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const userService = new UserService(prisma.user);
const authService = new AuthService(userService);

export const auth = new AuthController(authService);
export { authContract } from "./auth.contract";

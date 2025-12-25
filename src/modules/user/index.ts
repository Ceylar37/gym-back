import prisma from "@/shared/domain/prisma";

import { UserService } from "./user.service";

const userService = new UserService(prisma.user);
const user = {
  service: userService,
};

export default user;

import { Prisma, User } from "@/generated/prisma";

export interface UpdateUserTokenArgs {
  id: string;
  email: string;
}

export interface CreateUserArgs {
  email: string;
  password: string;
}

export interface LoginUserArgs {
  email: string;
  password: string;
}

export interface RemoveRefreshTokenArgs {
  id: string;
  refreshToken: string;
}

export interface UserModel {
  base: User;
  createArgs: Prisma.UserUncheckedCreateInput;
  updateArgs: Prisma.UserUncheckedUpdateInput & { id: string };
}

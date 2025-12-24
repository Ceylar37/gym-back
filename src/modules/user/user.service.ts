import { User } from "@/generated/prisma/client";
import { ErrorCode } from "@/shared/base/error-code";
import { hash } from "@/shared/domain/bcrypt";
import { sign, verify } from "@/shared/domain/jwt";
import prisma from "@/shared/domain/prisma";

import { BaseService } from "../../shared/base/base.service";
import { BaseError } from "../../shared/base/base-error";

import {
  CreateUserDto,
  RemoveRefreshTokenDto,
  UpdateUserTokenDto,
} from "./user.type";

import z from "zod";

enum Token {
  Access = "accessTokens",
  Refresh = "refreshTokens",
}

const PRIVATE_KEYS = {
  [Token.Access]: process.env.ACCESS_PRIVATE_KEY as string,
  [Token.Refresh]: process.env.REFRESH_PRIVATE_KEY as string,
};

const LIFE_TIMES = {
  [Token.Access]: "30m",
  [Token.Refresh]: "30d",
} as const;

if (!PRIVATE_KEYS[Token.Access]) {
  throw new Error("ACCESS_PRIVATE_KEY is not defined");
}
if (!PRIVATE_KEYS[Token.Refresh]) {
  throw new Error("REFRESH_PRIVATE_KEY is not defined");
}

const userDataSchema = z.object({
  id: z.string(),
  email: z.string(),
});

export class UserService extends BaseService {
  constructor(private readonly userModel: typeof prisma.user) {
    super();
  }

  async createAccessToken(payload: UpdateUserTokenDto) {
    const token = sign(payload, PRIVATE_KEYS[Token.Access], {
      expiresIn: LIFE_TIMES[Token.Access],
    });
    await this.userModel.update({
      where: {
        id: payload.id,
      },
      data: {
        accessTokens: {
          push: token,
        },
      },
    });
    this.clearExpiredTokens(payload.id, Token.Access);
    return token;
  }

  async createRefreshToken(payload: UpdateUserTokenDto) {
    const token = sign(payload, PRIVATE_KEYS[Token.Refresh], {
      expiresIn: LIFE_TIMES[Token.Refresh],
    });
    await this.userModel.update({
      where: {
        id: payload.id,
      },
      data: {
        refreshTokens: {
          push: token,
        },
      },
    });
    this.clearExpiredTokens(payload.id, Token.Refresh);
    return token;
  }

  async clearExpiredTokens(id: string, type: Token) {
    const user = await this.userModel.findUnique({
      where: {
        id,
      },
      select: {
        accessTokens: true,
        refreshTokens: true,
      },
    });

    if (!user) {
      return;
    }

    await this.userModel.update({
      where: {
        id,
      },
      data: {
        [type]: {
          set: user[type].filter((token) => verify(token, PRIVATE_KEYS[type])),
        },
      },
    });
  }

  async create(user: CreateUserDto) {
    const userData = {
      ...user,
    };

    if (user.password) {
      userData.password = await hash(user.password);
    }

    return await this.userModel.create({
      data: userData,
    });
  }

  async findByEmail(email: string) {
    return await this.userModel.findFirst({
      where: {
        email,
      },
    });
  }

  async verifyUserByAccessToken(token: string): Promise<User> {
    if (!token) {
      throw new BaseError(ErrorCode.Unauthorized, 401);
    }

    const userData = verify(token, PRIVATE_KEYS[Token.Access]);
    if (!userData) {
      throw new BaseError(ErrorCode.Unauthorized, 401);
    }

    const { success, data: userDataParsed } =
      userDataSchema.safeParse(userData);
    if (!success) {
      throw new BaseError(ErrorCode.Unauthorized, 401);
    }

    const userFromDb = await this.userModel.findUnique({
      where: {
        id: userDataParsed.id,
      },
    });
    if (!userFromDb || !userFromDb.accessTokens.includes(token)) {
      throw new BaseError(ErrorCode.Unauthorized, 401);
    }

    return userFromDb;
  }

  async verifyUserByRefreshToken(token: string): Promise<User> {
    if (!token) {
      throw new BaseError(ErrorCode.Unauthorized, 401);
    }

    const userData = verify(token, PRIVATE_KEYS[Token.Refresh]);
    if (!userData) {
      throw new BaseError(ErrorCode.Unauthorized, 401);
    }

    const { success, data: userDataParsed } =
      userDataSchema.safeParse(userData);
    if (!success) {
      throw new BaseError(ErrorCode.Unauthorized, 401);
    }

    const userFromDb = await this.userModel.findUnique({
      where: {
        id: userDataParsed.id,
      },
    });
    if (!userFromDb || !userFromDb.refreshTokens.includes(token)) {
      throw new BaseError(ErrorCode.Unauthorized, 401);
    }

    return userFromDb;
  }

  async refresh(token: string) {
    const user = await this.verifyUserByRefreshToken(token);

    const newAccessToken = await this.createAccessToken({
      id: user.id,
      email: user.email,
    });
    const newRefreshToken = await this.createRefreshToken({
      id: user.id,
      email: user.email,
    });

    // clear previous refresh token
    this.removeRefreshToken({ id: user.id, refreshToken: token });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async removeRefreshToken({ id, refreshToken }: RemoveRefreshTokenDto) {
    const user = await this.userModel.findUnique({
      where: {
        id,
      },
      select: {
        refreshTokens: true,
      },
    });

    if (!user) {
      throw new BaseError(ErrorCode.NotFound, 404);
    }

    await this.userModel.update({
      where: {
        id,
      },
      data: {
        refreshTokens: user.refreshTokens.filter(
          (token) => token !== refreshToken
        ),
      },
    });
  }
}

import { UserService } from "@/modules/user/user.service";
import { CreateUserArgs, LoginUserArgs } from "@/modules/user/user.model";
import { BaseService } from "@/shared/base/base.service";
import { BaseError } from "@/shared/base/base-error";
import { ErrorCode } from "@/shared/base/error-code";
import { compare } from "@/shared/domain/bcrypt";

export class AuthService extends BaseService {
  constructor(private userService: UserService) {
    super();
  }

  async register({ email, password }: CreateUserArgs) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new BaseError(ErrorCode.AlreadyExists, 400);
    }

    const createdUser = await this.userService.create({
      email,
      password,
    });

    const accessToken = await this.userService.createAccessToken({
      id: createdUser.id,
      email: createdUser.email,
    });
    const refreshToken = await this.userService.createRefreshToken({
      id: createdUser.id,
      email: createdUser.email,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async login({ email, password }: LoginUserArgs) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BaseError(ErrorCode.InvalidCredentials, 401);
    }

    if (!(await compare(password, user.password))) {
      throw new BaseError(ErrorCode.InvalidCredentials, 401);
    }

    const accessToken = await this.userService.createAccessToken({
      id: user.id,
      email: user.email,
    });
    const refreshToken = await this.userService.createRefreshToken({
      id: user.id,
      email: user.email,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string) {
    return await this.userService.refresh(refreshToken);
  }
}

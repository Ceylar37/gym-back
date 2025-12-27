import { Prisma } from "@/generated/prisma";
import { BaseService } from "@/shared/base/base.service";
import { BaseError } from "@/shared/base/base-error";
import { ErrorCode } from "@/shared/base/error-code";
import { ReadArgs } from "@/shared/domain/model/read-params";

import { UserService } from "../user/user.service";

import { ExerciseTypeModel } from "./exercise-type.model";

export class ExerciseTypeService extends BaseService {
  constructor(
    private readonly exerciseTypeModel: typeof prisma.exerciseType,
    private readonly userService: UserService
  ) {
    super();
  }

  async create(data: ExerciseTypeModel["createArgs"]) {
    return await this.exerciseTypeModel.create({
      data,
    });
  }

  async read(userId: string, { filter, limit, page }: ReadArgs) {
    const take = page && limit ? limit : undefined;
    const skip = page && limit ? (page - 1) * limit : undefined;

    const where: Prisma.ExerciseTypeWhereInput = {
      ...filter,
      userId,
    };

    const content = await this.exerciseTypeModel.findMany({
      where,
      take,
      skip,
    });

    const count = await this.exerciseTypeModel.count({
      where,
    });

    return {
      content,
      meta: {
        limit,
        page,
        pages: page && limit ? Math.ceil(count / limit) : undefined,
      },
    };
  }

  async readOne(id: string) {
    const exerciseType = await this.exerciseTypeModel.findUnique({
      where: { id },
    });
    if (!exerciseType) {
      throw new BaseError(ErrorCode.NotFound, 404);
    }
    return exerciseType;
  }

  async update({ id, ...data }: ExerciseTypeModel["updateArgs"]) {
    return await this.exerciseTypeModel.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    await this.exerciseTypeModel.delete({
      where: {
        id: id,
      },
    });
  }
}

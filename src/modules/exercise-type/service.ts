import { BaseError } from "@/shared/base/base-error";
import { ErrorCode } from "@/shared/base/error-code";
import { UserCrudService } from "@/shared/user-crud/user-crud.service";

import { UserService } from "../user/user.service";

import { ExerciseTypeModel } from "./model";

const select = {
  id: true,
  name: true,
  favorite: true,
  description: true,
  restTime: true,
  muscleGroups: true,
};

export class ExerciseTypeService extends UserCrudService<ExerciseTypeModel> {
  constructor(
    private readonly exerciseTypeModel: typeof prisma.exerciseType,
    private readonly userService: UserService
  ) {
    super(exerciseTypeModel, select);
  }

  async create(data: ExerciseTypeModel["createArgs"]) {
    return await this.exerciseTypeModel.create({
      data,
      select,
    });
  }

  async readOne(id: string) {
    const exerciseType = await this.exerciseTypeModel.findUnique({
      where: { id },
      select,
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
      select,
    });
  }

  async delete(id: string) {
    await this.exerciseTypeModel.delete({
      where: {
        id,
      },
    });
  }
}

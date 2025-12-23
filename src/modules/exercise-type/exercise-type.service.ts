import { BaseService } from "@/shared/base/base.service";
import { BaseError } from "@/shared/base/base-error";
import { ErrorCode } from "@/shared/base/error-code";

import { ExerciseTypeModel } from "./exercise-type.model";

export class ExerciseTypeService extends BaseService {
  constructor(private readonly exerciseTypeModel: typeof prisma.exerciseType) {
    super();
  }

  async read(userId: string) {
    return await this.exerciseTypeModel.findMany({
      where: {
        userId,
      },
    });
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

  async create(data: ExerciseTypeModel["createArgs"]) {
    return await this.exerciseTypeModel.create({
      data,
    });
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

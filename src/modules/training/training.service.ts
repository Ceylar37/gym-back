import { Prisma } from "@/generated/prisma";
import { BaseError } from "@/shared/base/base-error";
import { ErrorCode } from "@/shared/base/error-code";
import { ReadArgs } from "@/shared/domain/model/read-params";
import { UserCrudService } from "@/shared/user-crud/user-crud.service";

import { TrainingModel } from "./training.model";

const select = {
  id: true,
  name: true,
  favorite: true,
  description: true,
  exerciseTypes: {
    select: {
      id: true,
      name: true,
      favorite: true,
      description: true,
      restTime: true,
      muscleGroups: true,
    },
  },
};

export class TrainingService extends UserCrudService<TrainingModel> {
  constructor(private readonly trainingModel: typeof prisma.training) {
    super(trainingModel, select);
  }

  async create({ exerciseTypeIds, ...data }: TrainingModel["createArgs"]) {
    return await this.trainingModel.create({
      data: {
        ...data,
        exerciseTypes: {
          connect: exerciseTypeIds.map((id) => ({ id })),
        },
      },
      select,
    });
  }

  async read(userId: string, { filter, limit, page }: ReadArgs) {
    const take = page && limit ? limit : undefined;
    const skip = page && limit ? (page - 1) * limit : undefined;

    const where: Prisma.TrainingWhereInput = {
      ...filter,
      userId,
    };

    const content = await this.trainingModel.findMany({
      where,
      take,
      skip,
      select,
    });

    const count = await this.trainingModel.count({
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
    const training = await this.trainingModel.findUnique({
      where: { id },
      select,
    });
    if (!training) {
      throw new BaseError(ErrorCode.NotFound, 404);
    }
    return training;
  }

  async update({ id, exerciseTypeIds, ...data }: TrainingModel["updateArgs"]) {
    const training = await this.readOne(id);

    const addedExerciseTypesIds = exerciseTypeIds.filter(
      (id) =>
        !training.exerciseTypes.find((exerciseType) => exerciseType.id === id)
    );
    const removedExerciseTypesIds = training.exerciseTypes
      .map((exerciseType) => exerciseType.id)
      .filter((id) => !exerciseTypeIds.includes(id));

    return await this.trainingModel.update({
      where: {
        id,
      },
      data: {
        ...data,
        exerciseTypes: {
          connect: addedExerciseTypesIds.map((id) => ({ id })),
          disconnect: removedExerciseTypesIds.map((id) => ({ id })),
        },
      },
      select,
    });
  }

  async delete(id: string) {
    const training = await this.readOne(id);

    await this.trainingModel.update({
      where: {
        id,
      },
      data: {
        exerciseTypes: {
          disconnect: training.exerciseTypes.map(({ id }) => ({ id })),
        },
      },
    });

    await this.trainingModel.delete({
      where: {
        id,
      },
    });
  }
}

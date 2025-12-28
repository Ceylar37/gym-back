import { BaseError } from "@/shared/base/base-error";
import { ErrorCode } from "@/shared/base/error-code";
import { UserCrudService } from "@/shared/user-crud/user-crud.service";

import { TrainingModel } from "./model";

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

  async create({ exerciseTypes, ...data }: TrainingModel["createArgs"]) {
    return await this.trainingModel.create({
      data: {
        ...data,
        exerciseTypes: {
          connect: exerciseTypes,
        },
      },
      select,
    });
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

  async update({ id, exerciseTypes, ...data }: TrainingModel["updateArgs"]) {
    const training = await this.readOne(id);

    const addedExerciseTypesIds = exerciseTypes.filter(
      ({ id }) =>
        !training.exerciseTypes.find((exerciseType) => exerciseType.id === id)
    );
    const removedExerciseTypesIds = training.exerciseTypes
      .map((exerciseType) => exerciseType.id)
      .filter(
        (id) => !exerciseTypes.find((exerciseType) => exerciseType.id === id)
      );

    return await this.trainingModel.update({
      where: {
        id,
      },
      data: {
        ...data,
        exerciseTypes: {
          connect: addedExerciseTypesIds,
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

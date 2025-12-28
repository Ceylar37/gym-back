import { BaseService } from "@/shared/base/base.service";
import { BaseError } from "@/shared/base/base-error";
import { ErrorCode } from "@/shared/base/error-code";

import { TrainingService } from "../training/service";
import { TrainingHistoryService } from "../training-history/service";
import { UserService } from "../user/user.service";

import { activeTrainingContract } from "./model";

import { z } from "zod";

export class ActiveTrainingService extends BaseService {
  constructor(
    private readonly userModel: typeof prisma.user,
    private readonly userService: UserService,
    private readonly trainingService: TrainingService,
    private readonly trainingHistoryService: TrainingHistoryService
  ) {
    super();
  }

  async start({
    id,
    dateStart,
    userId,
  }: z.infer<typeof activeTrainingContract.start.body> & { userId: string }) {
    const { exerciseTypes, ...training } = await this.trainingService.readOne(
      id
    );

    const { activeTraining: currentActiveTraining } =
      await this.userService.getOne(userId);

    if (currentActiveTraining) {
      throw new BaseError(ErrorCode.AlreadyExists, 400);
    }

    const { activeTraining } = await this.userModel.update({
      where: {
        id: userId,
      },
      data: {
        activeTraining: {
          name: training.name,
          description: training.description,
          dateStart: dateStart,
          exercises: exerciseTypes.map((exerciseType) => ({
            name: exerciseType.name,
            description: exerciseType.description,
            restTime: exerciseType.restTime,
            sets: [],
          })),
        },
      },
      select: {
        activeTraining: true,
      },
    });
    return activeTraining;
  }

  async updateActiveTraining({
    userId,
    ...newActiveTraining
  }: z.infer<typeof activeTrainingContract.update.body> & { userId: string }) {
    const { activeTraining: currentActiveTraining } =
      await this.userService.getOne(userId);

    if (!currentActiveTraining) {
      throw new BaseError(ErrorCode.NotFound, 404);
    }

    const { activeTraining } = await this.userModel.update({
      where: {
        id: userId,
      },
      data: {
        activeTraining: newActiveTraining,
      },
      select: {
        activeTraining: true,
      },
    });
    return activeTraining;
  }

  async end({ userId }: { userId: string }) {
    const { activeTraining: currentActiveTraining } =
      await this.userService.getOne(userId);

    if (!currentActiveTraining) {
      throw new BaseError(ErrorCode.NotFound, 404);
    }

    await this.trainingHistoryService.create({
      userId,
      ...currentActiveTraining,
    });

    await this.userModel.update({
      where: {
        id: userId,
      },
      data: {
        activeTraining: null,
      },
    });
  }
}

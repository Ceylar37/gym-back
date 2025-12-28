import { BaseService } from "@/shared/base/base.service";
import { BaseError } from "@/shared/base/base-error";
import { ErrorCode } from "@/shared/base/error-code";
import { ReadArgs } from "@/shared/domain/model/read-params";

import { TrainingHistoryModel } from "./model";

const select = {
  id: true,
  name: true,
  description: true,
  dateStart: true,
  exercises: true,
};

export class TrainingHistoryService extends BaseService {
  constructor(
    private readonly trainingHistoryModel: typeof prisma.trainingHistory
  ) {
    super();
  }

  private formatTrainingHistory(
    trainingHistory: Omit<TrainingHistoryModel["base"], "dateStart"> & {
      dateStart: Date;
    }
  ): TrainingHistoryModel["base"] {
    return {
      ...trainingHistory,
      dateStart: trainingHistory.dateStart.toISOString(),
    };
  }

  async create(data: TrainingHistoryModel["createArgs"]) {
    return this.formatTrainingHistory(
      await this.trainingHistoryModel.create({
        data,
        select,
      })
    );
  }

  async read(userId: string, { filter, limit, page }: ReadArgs) {
    const take = page && limit ? limit : undefined;
    const skip = page && limit ? (page - 1) * limit : undefined;

    const where = {
      ...filter,
      userId,
    };

    const content = (
      await this.trainingHistoryModel.findMany({
        where,
        take,
        skip,
        select,
      })
    ).map(this.formatTrainingHistory);

    const count = await this.trainingHistoryModel.count({
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
    const trainingHistory = await this.trainingHistoryModel.findUnique({
      where: { id },
      select,
    });
    if (!trainingHistory) {
      throw new BaseError(ErrorCode.NotFound, 404);
    }
    return this.formatTrainingHistory(trainingHistory);
  }

  async update({ id, ...data }: TrainingHistoryModel["updateArgs"]) {
    return this.formatTrainingHistory(
      await this.trainingHistoryModel.update({
        where: {
          id,
        },
        data,
        select,
      })
    );
  }

  async delete(id: string) {
    await this.trainingHistoryModel.delete({
      where: {
        id,
      },
    });
  }
}

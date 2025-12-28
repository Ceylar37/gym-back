import prisma from "@/shared/domain/prisma";

import { TrainingHistoryController } from "./controller";
import { TrainingHistoryService } from "./service";

const trainingHistoryService = new TrainingHistoryService(
  prisma.trainingHistory
);
const trainingHistoryController = new TrainingHistoryController(
  trainingHistoryService
);
const trainingHistory = {
  service: trainingHistoryService,
  controller: trainingHistoryController,
};

export default trainingHistory;

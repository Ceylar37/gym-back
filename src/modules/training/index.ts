import prisma from "@/shared/domain/prisma";

import { TrainingController } from "./training.controller";
import { TrainingService } from "./training.service";

const trainingService = new TrainingService(prisma.training);
const trainingController = new TrainingController(trainingService);
const training = {
  service: trainingService,
  controller: trainingController,
};

export default training;

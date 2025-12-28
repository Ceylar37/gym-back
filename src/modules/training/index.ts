import prisma from "@/shared/domain/prisma";

import { TrainingController } from "./controller";
import { TrainingService } from "./service";

const trainingService = new TrainingService(prisma.training);
const trainingController = new TrainingController(trainingService);
const training = {
  service: trainingService,
  controller: trainingController,
};

export default training;

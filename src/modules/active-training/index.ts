import training from "@/modules/training";
import user from "@/modules/user";
import prisma from "@/shared/domain/prisma";

import { ActiveTrainingController } from "./controller";
import { ActiveTrainingService } from "./service";

const activeTrainingService = new ActiveTrainingService(
  prisma.user,
  user.service,
  training.service
);
const activeTrainingController = new ActiveTrainingController(
  activeTrainingService
);
const activeTraining = {
  service: activeTrainingService,
  controller: activeTrainingController,
};

export default activeTraining;
export { activeTrainingContract } from "./model";

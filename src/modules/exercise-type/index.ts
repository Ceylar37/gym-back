import user from "@/modules/user";
import prisma from "@/shared/domain/prisma";

import { ExerciseTypeController } from "./controller";
import { ExerciseTypeService } from "./service";

const exerciseTypeService = new ExerciseTypeService(
  prisma.exerciseType,
  user.service
);
const exerciseTypeController = new ExerciseTypeController(exerciseTypeService);
const exerciseType = {
  service: exerciseTypeService,
  controller: exerciseTypeController,
};

export default exerciseType;

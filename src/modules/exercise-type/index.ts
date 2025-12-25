import user from "@/modules/user";
import prisma from "@/shared/domain/prisma";

import { ExerciseTypeController } from "./exercise-type.controller";
import { ExerciseTypeService } from "./exercise-type.service";

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

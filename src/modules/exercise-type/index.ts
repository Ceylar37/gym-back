import prisma from "@/shared/domain/prisma";

import { ExerciseTypeController } from "./exercise-type.controller";
import { ExerciseTypeService } from "./exercise-type.service";

const exerciseTypeService = new ExerciseTypeService(prisma.exerciseType);

export const exerciseType = new ExerciseTypeController(exerciseTypeService);

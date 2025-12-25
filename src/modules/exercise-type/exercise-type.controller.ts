import { UserCrudController } from "@/shared/user-crud/user-crud.controller";

import { exerciseTypeContract, ExerciseTypeModel } from "./exercise-type.model";
import { ExerciseTypeService } from "./exercise-type.service";

export class ExerciseTypeController extends UserCrudController<ExerciseTypeModel> {
  constructor(private readonly exerciseTypeService: ExerciseTypeService) {
    super(exerciseTypeService, exerciseTypeContract);
  }
}

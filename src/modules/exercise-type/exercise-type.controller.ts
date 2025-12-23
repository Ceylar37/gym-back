import { CrudController } from "@/shared/crud/crud.controller";

import { exerciseTypeContract, ExerciseTypeModel } from "./exercise-type.model";
import { ExerciseTypeService } from "./exercise-type.service";

export class ExerciseTypeController extends CrudController<ExerciseTypeModel> {
  constructor(private readonly exerciseTypeService: ExerciseTypeService) {
    super(exerciseTypeService, exerciseTypeContract);
  }
}

import { UserCrudController } from "@/shared/user-crud/user-crud.controller";

import { exerciseTypeContract, ExerciseTypeModel } from "./model";
import { ExerciseTypeService } from "./service";

export class ExerciseTypeController extends UserCrudController<ExerciseTypeModel> {
  constructor(private readonly exerciseTypeService: ExerciseTypeService) {
    super(exerciseTypeService, exerciseTypeContract);
  }
}

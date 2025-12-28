import { UserCrudController } from "@/shared/user-crud/user-crud.controller";

import { trainingContract, TrainingModel } from "./model";
import { TrainingService } from "./service";

export class TrainingController extends UserCrudController<TrainingModel> {
  constructor(private readonly trainingService: TrainingService) {
    super(trainingService, trainingContract);
  }
}

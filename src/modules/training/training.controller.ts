import { UserCrudController } from "@/shared/user-crud/user-crud.controller";

import { trainingContract, TrainingModel } from "./training.model";
import { TrainingService } from "./training.service";

export class TrainingController extends UserCrudController<TrainingModel> {
  constructor(private readonly trainingService: TrainingService) {
    super(trainingService, trainingContract);
  }
}

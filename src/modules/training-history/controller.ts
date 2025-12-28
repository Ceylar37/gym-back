import { UserCrudController } from "@/shared/user-crud/user-crud.controller";

import { _trainingHistoryContract, TrainingHistoryModel } from "./model";
import { TrainingHistoryService } from "./service";

export class TrainingHistoryController extends UserCrudController<TrainingHistoryModel> {
  constructor(private readonly trainingHistoryService: TrainingHistoryService) {
    super(trainingHistoryService, _trainingHistoryContract);
  }
}

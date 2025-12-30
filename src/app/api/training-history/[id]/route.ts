import trainingHistory from "@/modules/training-history";
import { corsEndpoint } from "@/shared/decorators/cors-endpoint";

export const { GET, DELETE, OPTIONS } = corsEndpoint({
  GET: trainingHistory.controller.readOne,
  DELETE: trainingHistory.controller.delete,
});

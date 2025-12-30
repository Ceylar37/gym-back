import trainingHistory from "@/modules/training-history";
import { corsEndpoint } from "@/shared/decorators/cors-endpoint";

export const { GET, PATCH, OPTIONS } = corsEndpoint({
  GET: trainingHistory.controller.read,
  PATCH: trainingHistory.controller.update,
});

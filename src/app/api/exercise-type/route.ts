import exerciseType from "@/modules/exercise-type";
import { corsEndpoint } from "@/shared/decorators/cors-endpoint";

export const { GET, POST, PATCH, OPTIONS } = corsEndpoint({
  GET: exerciseType.controller.read,
  POST: exerciseType.controller.create,
  PATCH: exerciseType.controller.update,
});

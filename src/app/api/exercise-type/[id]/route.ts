import exerciseType from "@/modules/exercise-type";
import { corsEndpoint } from "@/shared/decorators/cors-endpoint";

export const { GET, DELETE, OPTIONS } = corsEndpoint({
  GET: exerciseType.controller.readOne,
  DELETE: exerciseType.controller.delete,
});

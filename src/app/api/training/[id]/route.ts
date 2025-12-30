import training from "@/modules/training";
import { corsEndpoint } from "@/shared/decorators/cors-endpoint";

export const { GET, DELETE, OPTIONS } = corsEndpoint({
  GET: training.controller.readOne,
  DELETE: training.controller.delete,
});

import training from "@/modules/training";
import { corsEndpoint } from "@/shared/decorators/cors-endpoint";

export const { GET, POST, PATCH, OPTIONS } = corsEndpoint({
  GET: training.controller.read,
  POST: training.controller.create,
  PATCH: training.controller.update,
});

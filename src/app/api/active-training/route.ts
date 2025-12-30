import activeTraining from "@/modules/active-training";
import { corsEndpoint } from "@/shared/decorators/cors-endpoint";

export const { GET, OPTIONS } = corsEndpoint({
  GET: activeTraining.controller.get,
});

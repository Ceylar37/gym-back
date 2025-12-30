import activeTraining from "@/modules/active-training";
import { corsEndpoint } from "@/shared/decorators/cors-endpoint";

export const { PATCH, OPTIONS } = corsEndpoint({
  PATCH: activeTraining.controller.update,
});

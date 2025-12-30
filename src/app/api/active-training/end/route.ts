import activeTraining from "@/modules/active-training";
import { corsEndpoint } from "@/shared/decorators/cors-endpoint";

export const { POST, OPTIONS } = corsEndpoint({
  POST: activeTraining.controller.end,
});

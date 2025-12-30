import auth from "@/modules/auth";
import { corsEndpoint } from "@/shared/decorators/cors-endpoint";

export const { POST, OPTIONS } = corsEndpoint({
  POST: auth.controller.register,
});

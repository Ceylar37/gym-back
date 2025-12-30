import auth from "@/modules/auth";
import { corsEndpoint } from "@/shared/decorators/cors-endpoint";

export const { GET, OPTIONS } = corsEndpoint({
  GET: auth.controller.profile,
});

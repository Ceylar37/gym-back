import activeTraining from '@/modules/active-training';
import { corsEndpoint } from '@/shared/decorators/cors-endpoint';

export const { OPTIONS, POST } = corsEndpoint({
  POST: activeTraining.controller.cancel
});

import { extendZodWithOpenApi } from '@anatine/zod-openapi';

import { z } from 'zod';

extendZodWithOpenApi(z);

export const unitSchema = z.object({ name: z.string(), value: z.number() }).strict().openapi({ title: 'Unit' });

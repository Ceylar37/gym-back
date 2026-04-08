import { extendZodWithOpenApi } from '@anatine/zod-openapi';

import { unitSchema } from './unit-schema';

import { z } from 'zod';

extendZodWithOpenApi(z);

export const setSchema = z
  .object({
    units: z.array(unitSchema),
    done: z.boolean()
  })
  .strict()
  .openapi({
    title: 'Set'
  });

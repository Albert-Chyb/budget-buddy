import { z } from 'zod';

export const numericRecordIdSchema = z.coerce
  .number()
  .positive()
  .int()
  .transform((id) => String(id));

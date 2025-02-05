import { z } from 'zod';
import { numericIdSchema } from '@/database/common-field-types-schemas.ts';

export const categoryTypeSchema = z.object({
  id: numericIdSchema,
  name: z.string().min(1).max(32),
  is_expense: z.boolean(),
});
export type CategoryTypeSchema = z.infer<typeof categoryTypeSchema>;

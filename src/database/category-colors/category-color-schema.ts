import { z } from 'zod';
import { numericIdSchema } from '@/database/common-field-types-schemas.ts';

const RGBColorPartSchema = z.number().int().min(0).max(255);

export const categoryColorSchema = z.object({
  id: numericIdSchema,
  name: z.string().min(1).max(32),
  red: RGBColorPartSchema,
  green: RGBColorPartSchema,
  blue: RGBColorPartSchema,
});
export type CategoryColorSchema = z.infer<typeof categoryColorSchema>;

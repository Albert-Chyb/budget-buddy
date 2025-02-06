import { z } from 'zod';
import { categoryColorSchema } from '@/database/category-colors/category-color-schema.ts';
import { categoryTypeSchema } from '@/database/category-types/category-type-schema.ts';
import {
  numericIdSchema,
  uuidSchema,
} from '@/database/common-field-types-schemas.ts';

export const NAME_MIN_LENGTH = 1;
export const NAME_MAX_LENGTH = 64;

export const categorySchema = z.object({
  id: numericIdSchema,
  name: z.string().min(NAME_MIN_LENGTH).max(NAME_MAX_LENGTH),
  color_id: categoryColorSchema.shape.id.nullable(),
  type_id: categoryTypeSchema.shape.id,
  owner_id: uuidSchema,
});
export type CategorySchema = z.infer<typeof categorySchema>;

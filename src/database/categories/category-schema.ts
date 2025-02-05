import { z } from 'zod';
import { categoryColorSchema } from '@/database/category-colors/category-color-schema.ts';
import { categoryTypeSchema } from '@/database/category-types/category-type-schema.ts';
import {
  numericIdSchema,
  uuidSchema,
} from '@/database/common-field-types-schemas.ts';

export const categorySchema = z.object({
  id: numericIdSchema,
  name: z.string().min(1).max(64),
  color_id: categoryColorSchema.shape.id.nullable(),
  type_id: categoryTypeSchema.shape.id,
  owner_id: uuidSchema,
});
export type CategorySchema = z.infer<typeof categorySchema>;

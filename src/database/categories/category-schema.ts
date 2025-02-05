import { z } from 'zod';
import { categoryColorSchema } from '@/database/category-colors/category-color-schema.ts';
import { categoryTypeSchema } from '@/database/category-types/category-type-schema.ts';

export const categorySchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(64),
  color_id: categoryColorSchema.shape.id.nullable(),
  type_id: categoryTypeSchema.shape.id,
  owner_id: z.string(),
});
export type CategorySchema = z.infer<typeof categorySchema>;

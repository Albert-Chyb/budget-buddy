import { z } from 'zod';
import {
  colorIdSchema,
  idSchema,
  nameSchema,
  ownerIdSchema,
  parentCategoryIdSchema,
  typeIdSchema,
} from '@/data-management/categories/data-mutation/category-form-fields-schemas.ts';
import { TablesUpdate } from '@/database/types.ts';

export const updateCategoryFormSchema = z.object({
  id: idSchema,
  name: nameSchema.optional(),
  type_id: typeIdSchema.optional(),
  owner_id: ownerIdSchema,
  color_id: colorIdSchema.optional(),
  parent_category_id: parentCategoryIdSchema.optional(),
}) satisfies z.ZodType<TablesUpdate<'categories'>>;
export type UpdateCategoryFormValue = z.infer<typeof updateCategoryFormSchema>;

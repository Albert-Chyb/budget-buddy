import { z } from 'zod';
import { TablesInsert } from '@/database/types.ts';
import {
  colorIdSchema,
  nameSchema,
  ownerIdSchema,
  parentCategoryIdSchema,
  typeIdSchema,
} from '@/data-management/categories/data-mutation/category-form-fields-schemas.ts';

export const createCategoryFormSchema = z.object({
  name: nameSchema,
  type_id: typeIdSchema,
  owner_id: ownerIdSchema,
  color_id: colorIdSchema,
  parent_category_id: parentCategoryIdSchema,
}) satisfies z.ZodType<TablesInsert<'categories'>>;
export type CreateCategoryFormValue = z.infer<typeof createCategoryFormSchema>;

export const CREATE_CATEGORY_FORM_PLACEHOLDER: CreateCategoryFormValue = {
  name: '',
  type_id: null as unknown as number,
  owner_id: '',
  color_id: null,
  parent_category_id: null,
};

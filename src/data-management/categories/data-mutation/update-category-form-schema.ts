import { z } from 'zod';
import { CategoryUpdateInput } from '@/database/category.ts';
import { createCategoryFormSchema } from '@/data-management/categories/data-mutation/create-category-form-schema.ts';

export const updateCategoryFormSchema =
  createCategoryFormSchema.partial() satisfies z.ZodType<CategoryUpdateInput>;

export type UpdateCategoryFormValue = z.infer<typeof updateCategoryFormSchema>;

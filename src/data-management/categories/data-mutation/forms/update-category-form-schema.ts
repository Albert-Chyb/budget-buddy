import { z } from 'zod';
import { CategoryUpdateInput } from '@/database/categories/category.ts';
import { createCategoryFormSchema } from '@/data-management/categories/data-mutation/forms/create-category-form-schema.ts';

export const updateCategoryFormSchema =
  createCategoryFormSchema.partial() satisfies z.ZodType<CategoryUpdateInput>;

export type UpdateCategoryFormValue = z.infer<typeof updateCategoryFormSchema>;

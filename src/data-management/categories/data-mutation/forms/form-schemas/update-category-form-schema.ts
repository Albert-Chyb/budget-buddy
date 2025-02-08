import { z } from 'zod';
import { createCategoryFormSchema } from '@/data-management/categories/data-mutation/forms/form-schemas/create-category-form-schema.ts';

export const updateCategoryFormSchema = createCategoryFormSchema.partial();

export type UpdateCategoryFormValue = z.infer<typeof updateCategoryFormSchema>;

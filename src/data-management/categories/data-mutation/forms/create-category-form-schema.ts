import { z } from 'zod';

import { CategoryInsertInput } from '@/database/categories/category.ts';

export const createCategoryFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Nazwa kategorii jest wymagana')
    .max(64, `Nazwa kategorii nie może być dłuższa niż 64 znaki`),
  type_id: z.number({ message: 'Wybierz typ transakcji' }),
  color_id: z.number().nullable(),
  parent_category_id: z.number().nullable(),
}) satisfies z.ZodType<CategoryInsertInput>;
export type CreateCategoryFormValue = z.infer<typeof createCategoryFormSchema>;

export const CREATE_CATEGORY_FORM_PLACEHOLDER: Readonly<CreateCategoryFormValue> =
  {
    name: '',
    type_id: null as unknown as number,
    color_id: null,
    parent_category_id: null,
  } as const;

import { z } from 'zod';
import { CATEGORY_NAME_LENGTH_CONSTRAINT } from '@/database/category-schema.ts';

const { min, max } = CATEGORY_NAME_LENGTH_CONSTRAINT;

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(min, 'Nazwa kategorii jest wymagana')
    .max(max, `Nazwa kategorii nie może być dłuższa niż ${max} znaków`),
  type_id: z.string().min(1, 'Wybierz typ kategorii'),
  color_id: z.string().transform((value) => value ?? null),
});
export type CategoryFormValue = z.infer<typeof categoryFormSchema>;

export const CATEGORY_FORM_PLACEHOLDER_VALUE: CategoryFormValue = {
  name: '',
  type_id: '',
  color_id: '',
};

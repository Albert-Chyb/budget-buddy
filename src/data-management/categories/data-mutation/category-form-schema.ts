import { z } from 'zod';

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Nazwa kategorii jest wymagana')
    .max(64, `Nazwa kategorii nie może być dłuższa niż 64 znaki`),
  type_id: z.string().min(1, 'Wybierz typ kategorii'),
  color_id: z.string().transform((value) => value ?? null),
});
export type CategoryFormValue = z.infer<typeof categoryFormSchema>;

export const CATEGORY_FORM_PLACEHOLDER_VALUE: CategoryFormValue = {
  name: '',
  type_id: '',
  color_id: '',
};

import { z } from 'zod';

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Nazwa kategorii jest wymagana')
    .max(64, `Nazwa kategorii nie może być dłuższa niż 64 znaki`),
  type_id: z.number({ message: 'Wybierz typ transakcji' }),
  color_id: z.number().nullable(),
});
export type CategoryFormValue = z.infer<typeof categoryFormSchema>;

export const CATEGORY_FORM_PLACEHOLDER_VALUE: CategoryFormValue = {
  name: '',
  type_id: null as unknown as number,
  color_id: null,
};

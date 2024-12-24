import { z } from 'zod';

export const categoryTypeSchema = z.enum(['income', 'expense'], {
  message: 'Typ kategorii jest wymagany',
});
export type CategoryType = z.infer<typeof categoryTypeSchema>;

export const categoryFormSchema = z.object({
  name: z.string().min(1, { message: 'Nazwa kategorii jest wymagana' }),
  type: categoryTypeSchema,
  colorId: z.string().optional(),
});
export type CategoryFormValue = z.infer<typeof categoryFormSchema>;

export const CATEGORY_FORM_PLACEHOLDER_VALUE: CategoryFormValue = {
  name: '',
  type: 'income',
};

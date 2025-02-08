import { z } from 'zod';
import {
  NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
} from '@/database/categories/category-schema.ts';
import {
  NAME_TOO_BIG_MSG,
  NAME_TOO_SHORT_MSG,
  TYPE_ID_REQUIRED_MSG,
} from '@/data-management/categories/data-mutation/forms/category-form-errors-messages.ts';
import { DefaultValues } from 'react-hook-form';

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(NAME_MIN_LENGTH, NAME_TOO_SHORT_MSG)
    .max(NAME_MAX_LENGTH, NAME_TOO_BIG_MSG),
  type_id: z.number({ message: TYPE_ID_REQUIRED_MSG }),
  color_id: z.number().nullable(),
});
export type CategoryFormValue = z.infer<typeof categoryFormSchema>;

export const CATEGORY_FORM_DEFAULT_VALUE: DefaultValues<CategoryFormValue> = {
  name: '',
  type_id: null as unknown as number,
  color_id: null,
};

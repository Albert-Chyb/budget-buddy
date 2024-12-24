import { useForm } from 'react-hook-form';
import {
  CATEGORY_FORM_PLACEHOLDER_VALUE,
  categoryFormSchema,
  CategoryFormValue,
} from '@/data-management/categories/category-form-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';

export const useCategoryForm = (initialValue?: CategoryFormValue) => {
  return useForm<CategoryFormValue>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: initialValue ?? CATEGORY_FORM_PLACEHOLDER_VALUE,
  });
};

import { Form } from '@/components/form.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CREATE_CATEGORY_FORM_DEFAULT_VALUE,
  createCategoryFormSchema,
  CreateCategoryFormValue,
} from '@/data-management/categories/data-mutation/forms/form-schemas/create-category-form-schema.ts';
import {
  CategoryForm,
  CategoryFormProps,
} from '@/data-management/categories/data-mutation/forms/category-form.tsx';

export type CreateCategoryFormProps =
  CategoryFormProps<CreateCategoryFormValue>;

export const CreateCategoryForm = (props: CreateCategoryFormProps) => {
  const form = useForm<CreateCategoryFormValue>({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: CREATE_CATEGORY_FORM_DEFAULT_VALUE,
  });

  return (
    <Form {...form}>
      <CategoryForm {...props} />
    </Form>
  );
};

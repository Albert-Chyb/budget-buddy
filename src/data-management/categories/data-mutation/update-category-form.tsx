import {
  updateCategoryFormSchema,
  UpdateCategoryFormValue,
} from '@/data-management/categories/data-mutation/update-category-form-schema.ts';
import { Form } from '@/components/form.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CategoryForm,
  CategoryFormProps,
} from '@/data-management/categories/data-mutation/category-form.tsx';

export interface UpdateCategoryFormProps
  extends CategoryFormProps<UpdateCategoryFormValue> {
  category: UpdateCategoryFormValue;
}

export const UpdateCategoryForm = (props: UpdateCategoryFormProps) => {
  const { category, ...categoryFormProps } = props;
  const form = useForm<UpdateCategoryFormValue>({
    resolver: zodResolver(updateCategoryFormSchema),
    defaultValues: category,
  });

  return (
    <Form {...form}>
      <CategoryForm {...categoryFormProps} />
    </Form>
  );
};

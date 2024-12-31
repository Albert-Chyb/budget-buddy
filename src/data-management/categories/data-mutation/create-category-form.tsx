import { Form } from '@/components/form.tsx';
import { Button } from '@/components/button.tsx';
import { CategoryNameFormField } from '@/data-management/categories/data-mutation/category-name-form-field.tsx';
import { CategoryTypeFormField } from '@/data-management/categories/data-mutation/category-type-form-field.tsx';
import { CategoryColorIdFormField } from '@/data-management/categories/data-mutation/category-color-id-form-field.tsx';
import { CategoryColor } from '@/data-management/categories/category-colors-query.ts';
import { CategoryType } from '@/data-management/categories/category-types-query.ts';
import { useForm } from 'react-hook-form';
import { useUserQuery } from '@/auth/user-query.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CREATE_CATEGORY_FORM_PLACEHOLDER,
  createCategoryFormSchema,
  CreateCategoryFormValue,
} from '@/data-management/categories/data-mutation/create-category-form-schema.ts';

export interface CreateCategoryFormProps {
  onSubmit: (formValue: CreateCategoryFormValue) => void;
  categoryTypes: CategoryType[];
  categoryColors: CategoryColor[];
}

export const CreateCategoryForm = (props: CreateCategoryFormProps) => {
  const { onSubmit, categoryTypes, categoryColors } = props;
  const { data: user } = useUserQuery();
  const form = useForm<CreateCategoryFormValue>({
    resolver: zodResolver(createCategoryFormSchema),
    defaultValues: {
      ...CREATE_CATEGORY_FORM_PLACEHOLDER,
      owner_id: user?.id ?? '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2'
      >
        <CategoryNameFormField<CreateCategoryFormValue> name='name' />

        <CategoryTypeFormField<CreateCategoryFormValue>
          name='type_id'
          categoryTypes={categoryTypes}
        />

        <CategoryColorIdFormField<CreateCategoryFormValue>
          name='color_id'
          categoryColors={categoryColors}
        />

        <Button className='w-full'>Zapisz</Button>
      </form>
    </Form>
  );
};

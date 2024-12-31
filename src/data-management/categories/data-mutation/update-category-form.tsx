import {
  updateCategoryFormSchema,
  UpdateCategoryFormValue,
} from '@/data-management/categories/data-mutation/update-category-form-schema.ts';
import { Form } from '@/components/form.tsx';
import { Button } from '@/components/button.tsx';
import { CategoryNameFormField } from '@/data-management/categories/data-mutation/category-name-form-field.tsx';
import { CategoryTypeFormField } from '@/data-management/categories/data-mutation/category-type-form-field.tsx';
import { CategoryColorIdFormField } from '@/data-management/categories/data-mutation/category-color-id-form-field.tsx';
import { CategoryColor } from '@/data-management/categories/category-colors-query.ts';
import { CategoryType } from '@/data-management/categories/category-types-query.ts';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export interface UpdateCategoryFormProps {
  onSubmit: (formValue: UpdateCategoryFormValue) => void;
  category?: UpdateCategoryFormValue;
  categoryTypes: CategoryType[];
  categoryColors: CategoryColor[];
}

export const UpdateCategoryForm = (props: UpdateCategoryFormProps) => {
  const { onSubmit, category, categoryTypes, categoryColors } = props;
  const form = useForm<UpdateCategoryFormValue>({
    resolver: zodResolver(updateCategoryFormSchema),
    defaultValues: category,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2'
      >
        <CategoryNameFormField<UpdateCategoryFormValue> name='name' />

        <CategoryTypeFormField<UpdateCategoryFormValue>
          name='type_id'
          categoryTypes={categoryTypes}
        />

        <CategoryColorIdFormField<UpdateCategoryFormValue>
          name='color_id'
          categoryColors={categoryColors}
        />

        <Button className='w-full'>Zapisz</Button>
      </form>
    </Form>
  );
};

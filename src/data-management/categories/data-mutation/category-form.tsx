import { CategoryFormValue } from '@/data-management/categories/data-mutation/category-form-schema.ts';
import { Form } from '@/components/form.tsx';
import { useCategoryForm } from '@/data-management/categories/data-mutation/category-form-hook.tsx';
import { Button } from '@/components/button.tsx';
import { CategoryNameFormField } from '@/data-management/categories/data-mutation/category-name-form-field.tsx';
import { CategoryTypeFormField } from '@/data-management/categories/data-mutation/category-type-form-field.tsx';
import { CategoryColorIdFormField } from '@/data-management/categories/data-mutation/category-color-id-form-field.tsx';
import { CategoryType } from '@/database/category-type-schema.ts';

import { CategoryColor } from '@/data-management/categories/category-colors-query.ts';

export interface CategoryFormProps {
  onSubmit: (formValue: CategoryFormValue) => void;
  category?: CategoryFormValue;
  categoryTypes: CategoryType[];
  categoryColors: CategoryColor[];
}

export const CategoryForm = (props: CategoryFormProps) => {
  const { onSubmit, category, categoryTypes, categoryColors } = props;
  const form = useCategoryForm(category);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2'
      >
        <CategoryNameFormField<CategoryFormValue> name='name' />
        <CategoryTypeFormField<CategoryFormValue>
          name='type_id'
          categoryTypes={categoryTypes}
        />
        <CategoryColorIdFormField<CategoryFormValue>
          name='color_id'
          categoryColors={categoryColors}
        />

        <Button className='w-full'>Zapisz</Button>
      </form>
    </Form>
  );
};

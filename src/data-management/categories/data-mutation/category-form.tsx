import { CategoryType } from '@/data-management/categories/category-types-query.ts';
import { CategoryColor } from '@/data-management/categories/category-colors-query.ts';
import { useFormContext } from 'react-hook-form';
import { CategoryNameFormField } from '@/data-management/categories/data-mutation/category-name-form-field.tsx';
import { CategoryTypeFormField } from '@/data-management/categories/data-mutation/category-type-form-field.tsx';
import { CategoryColorIdFormField } from '@/data-management/categories/data-mutation/category-color-id-form-field.tsx';
import { Button } from '@/components/button.tsx';
import { UpdateCategoryFormValue } from '@/data-management/categories/data-mutation/update-category-form-schema.ts';
import { CreateCategoryFormValue } from '@/data-management/categories/data-mutation/create-category-form-schema.ts';

type CategoryFormValueShape = CreateCategoryFormValue | UpdateCategoryFormValue;

export interface CategoryFormProps<TValue extends CategoryFormValueShape> {
  onSubmit: (formValue: TValue) => void;
  categoryTypes: CategoryType[];
  categoryColors: CategoryColor[];
}

export const CategoryForm = <T extends CategoryFormValueShape>(
  props: CategoryFormProps<T>,
) => {
  const { onSubmit, categoryTypes, categoryColors } = props;
  const form = useFormContext<T>();

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className='space-y-2'
    >
      <CategoryNameFormField<CategoryFormValueShape> name='name' />

      <CategoryTypeFormField<CategoryFormValueShape>
        name='type_id'
        categoryTypes={categoryTypes}
      />

      <CategoryColorIdFormField<CategoryFormValueShape>
        name='color_id'
        categoryColors={categoryColors}
      />

      <Button className='w-full'>Zapisz</Button>
    </form>
  );
};

import { CategoryTypesQueryRow } from '@/database/category-types/query.ts';
import { CategoryColor } from '@/database/category-colors/query.ts';
import { useFormContext } from 'react-hook-form';
import { CategoryNameFormField } from '@/data-management/categories/data-mutation/forms/form-fields/category-name-form-field.tsx';
import { CategoryTypeFormField } from '@/data-management/categories/data-mutation/forms/form-fields/category-type-form-field.tsx';
import { CategoryColorFormField } from '@/data-management/categories/data-mutation/forms/form-fields/category-color-form-field.tsx';
import { UpdateCategoryFormValue } from '@/data-management/categories/data-mutation/forms/form-schemas/update-category-form-schema.ts';
import { CreateCategoryFormValue } from '@/data-management/categories/data-mutation/forms/form-schemas/create-category-form-schema.ts';
import { PendingButton } from '@/components/pending-button.tsx';

type CategoryFormValueShape = CreateCategoryFormValue | UpdateCategoryFormValue;

export interface CategoryFormProps<TValue extends CategoryFormValueShape> {
  onSubmit: (formValue: TValue) => void;
  categoryTypes: CategoryTypesQueryRow[];
  categoryColors: CategoryColor[];
  isPending: boolean;
}

export const CategoryForm = <T extends CategoryFormValueShape>(
  props: CategoryFormProps<T>,
) => {
  const { onSubmit, categoryTypes, categoryColors, isPending } = props;
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

      <CategoryColorFormField<CategoryFormValueShape>
        name='color_id'
        categoryColors={categoryColors}
      />

      <PendingButton
        isPending={isPending}
        className='w-full'
      >
        Zapisz
      </PendingButton>
    </form>
  );
};

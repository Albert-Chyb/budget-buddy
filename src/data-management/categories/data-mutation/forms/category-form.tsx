import { Form } from '@/components/form.tsx';
import { PendingButton } from '@/components/pending-button.tsx';
import { CategoryColorFormField } from '@/data-management/categories/data-mutation/forms/form-fields/category-color-form-field.tsx';
import { CategoryNameFormField } from '@/data-management/categories/data-mutation/forms/form-fields/category-name-form-field.tsx';
import { CategoryTypeFormField } from '@/data-management/categories/data-mutation/forms/form-fields/category-type-form-field.tsx';
import {
  CATEGORY_FORM_DEFAULT_VALUE,
  categoryFormSchema,
  CategoryFormValue,
} from '@/data-management/categories/data-mutation/forms/form-schemas/category-form-schema.ts';
import { CategoryColor } from '@/database/category-colors/query.ts';
import { CategoryTypesQueryRow } from '@/database/category-types/query.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { DefaultValues, useForm } from 'react-hook-form';

export interface CategoryFormProps {
  onSubmit: (formValue: CategoryFormValue) => void;
  categoryTypes: CategoryTypesQueryRow[];
  categoryColors: CategoryColor[];
  isPending: boolean;
  category?: DefaultValues<CategoryFormValue>;
}

export const CategoryForm = ({
  onSubmit,
  categoryTypes,
  categoryColors,
  isPending,
  category = CATEGORY_FORM_DEFAULT_VALUE,
}: CategoryFormProps) => {
  const form = useForm<CategoryFormValue>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: category,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((formValue) => onSubmit(formValue))}
        className='space-y-2'
      >
        <CategoryNameFormField<CategoryFormValue> name='name' />

        <CategoryTypeFormField<CategoryFormValue>
          name='type_id'
          categoryTypes={categoryTypes}
        />

        <CategoryColorFormField<CategoryFormValue>
          name='color_id'
          categoryColors={categoryColors}
        />

        <PendingButton
          isPending={isPending}
          className='w-full'
          data-testid='category-form-submit-btn'
        >
          Zapisz
        </PendingButton>
      </form>
    </Form>
  );
};

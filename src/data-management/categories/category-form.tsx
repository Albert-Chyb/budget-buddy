import { CategoryFormValue } from '@/data-management/categories/category-form-schema.ts';
import { Form } from '@/components/form';
import { useCategoryForm } from '@/data-management/categories/category-form-hook.tsx';
import { Button } from '@/components/button.tsx';
import { CategoryNameFormField } from '@/data-management/categories/category-name-form-field.tsx';
import { CategoryTypeFormField } from '@/data-management/categories/category-type-form-field.tsx';
import { CategoryColorIdFormField } from '@/data-management/categories/category-color-id-form-field.tsx';

export interface CategoryFormProps {
  onSubmit: (formValue: CategoryFormValue) => void;
  category?: CategoryFormValue;
}

export const CategoryForm = (props: CategoryFormProps) => {
  const { onSubmit, category } = props;
  const form = useCategoryForm(category);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2'
      >
        <CategoryNameFormField<CategoryFormValue> name='name' />
        <CategoryTypeFormField<CategoryFormValue> name='type' />
        <CategoryColorIdFormField<CategoryFormValue> name='colorId' />

        <Button className='w-full'>Zapisz</Button>
      </form>
    </Form>
  );
};

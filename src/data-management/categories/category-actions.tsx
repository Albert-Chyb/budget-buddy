import { CategoryEditor } from '@/data-management/categories/category-editor.tsx';
import { Button } from '@/components/button.tsx';
import { Trash } from 'lucide-react';
import { CategoryFormValue } from '@/data-management/categories/category-form-schema.ts';

export interface CategoryActionsProps {
  category: CategoryFormValue;
}

export function CategoryActions({ category }: CategoryActionsProps) {
  function handleSubmit(formValue: CategoryFormValue) {
    console.log(`Set category (${category.name}) to: `, formValue);
  }

  return (
    <>
      <CategoryEditor
        category={category}
        onSubmit={handleSubmit}
      />

      <Button variant='destructive'>
        <Trash /> Usuń
      </Button>
    </>
  );
}

import { CategoryEditor } from '@/data-management/categories/data-mutation/category-editor.tsx';
import { Button } from '@/components/button.tsx';
import { Trash } from 'lucide-react';
import { CategoryFormValue } from '@/data-management/categories/data-mutation/category-form-schema.ts';

import { CategoryType } from '@/database/category-type-schema.ts';
import { CategoryColor } from '@/database/category-color-schema.ts';

export interface CategoryActionsProps {
  category: CategoryFormValue;
  categoryTypes: CategoryType[];
  categoryColors: CategoryColor[];
}

export function CategoryActions(props: CategoryActionsProps) {
  const { category, categoryTypes, categoryColors } = props;
  function handleSubmit(formValue: CategoryFormValue) {
    console.log(`Set category (${category.name}) to: `, formValue);
  }

  return (
    <>
      <CategoryEditor
        category={category}
        onSubmit={handleSubmit}
        categoryTypes={categoryTypes}
        categoryColors={categoryColors}
      />

      <Button variant='destructive'>
        <Trash /> Usuń
      </Button>
    </>
  );
}

import { CategoryEditor } from '@/data-management/categories/data-mutation/category-editor.tsx';
import { Button } from '@/components/button.tsx';
import { Trash } from 'lucide-react';
import { CategoryFormValue } from '@/data-management/categories/data-mutation/category-form-schema.ts';
import { CategoryColor } from '@/data-management/categories/category-colors-query.ts';
import { CategoryType } from '@/data-management/categories/category-types-query.ts';
import { useCategoryUpdateMutation } from '@/data-management/categories/category-update-mutation.ts';
import { useCategoryDeleteMutation } from '@/data-management/categories/category-delete-mutation.ts';

export interface CategoryActionsProps {
  categoryId: string;
  category: CategoryFormValue;
  categoryTypes: CategoryType[];
  categoryColors: CategoryColor[];
}

export function CategoryActions(props: CategoryActionsProps) {
  const { category, categoryTypes, categoryColors, categoryId } = props;
  const { mutate: updateCategory } = useCategoryUpdateMutation();
  const { mutate: deleteCategory } = useCategoryDeleteMutation();

  function handleSubmit(formValue: CategoryFormValue) {
    const { name, type_id, color_id } = formValue;

    updateCategory(
      {
        id: Number(categoryId),
        name,
        type_id: Number(type_id),
        color_id: color_id ? Number(color_id) : null,
      },
      { onSuccess: () => alert('Zaktualizowano kategorie') },
    );
  }

  function handleDeleteBtnClick() {
    deleteCategory(Number(categoryId), {
      onSuccess: () => alert('Usunięto kategorię'),
    });
  }

  return (
    <>
      <CategoryEditor
        category={category}
        onSubmit={handleSubmit}
        categoryTypes={categoryTypes}
        categoryColors={categoryColors}
      />

      <Button
        variant='destructive'
        onClick={handleDeleteBtnClick}
      >
        <Trash /> Usuń
      </Button>
    </>
  );
}

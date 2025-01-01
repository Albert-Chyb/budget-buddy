import { CategoryEditor } from '@/data-management/categories/data-mutation/category-editor.tsx';
import { UpdateCategoryFormValue } from '@/data-management/categories/data-mutation/update-category-form-schema.ts';
import { CategoryColor } from '@/data-management/categories/category-colors-query.ts';
import { CategoryType } from '@/data-management/categories/category-types-query.ts';
import { useCategoryUpdateMutation } from '@/data-management/categories/update-category-mutation.ts';
import { useCategoryDeleteMutation } from '@/data-management/categories/category-delete-mutation.ts';
import { CategoryRowData } from '@/data-management/categories/categories-table-data-query.ts';
import { categoryRowDataToFormValue } from '@/data-management/categories/category-row-data-to-form-value.ts';
import { PendingButton } from '@/components/pending-button.tsx';

export interface CategoryActionsProps {
  category: CategoryRowData;
  categoryTypes: CategoryType[];
  categoryColors: CategoryColor[];
}

export function CategoryActions(props: CategoryActionsProps) {
  const { category, categoryTypes, categoryColors } = props;
  const { mutate: updateCategory, isPending: isUpdatePending } =
    useCategoryUpdateMutation();
  const { mutate: deleteCategory, isPending: isDeletePending } =
    useCategoryDeleteMutation();

  function handleSubmit(formValue: UpdateCategoryFormValue) {
    updateCategory(
      { id: category.id, category: formValue },
      {
        onSuccess: () => alert('Zaktualizowano kategorie'),
      },
    );
  }

  function handleDeleteBtnClick() {
    deleteCategory(category.id, {
      onSuccess: () => alert('Usunięto kategorię'),
    });
  }

  return (
    <>
      <CategoryEditor
        category={categoryRowDataToFormValue(category)}
        onSubmit={handleSubmit}
        categoryTypes={categoryTypes}
        categoryColors={categoryColors}
        isPending={isUpdatePending}
      />

      <PendingButton
        variant='destructive'
        onClick={handleDeleteBtnClick}
        isPending={isDeletePending}
      >
        Usuń
      </PendingButton>
    </>
  );
}

import { useCategoryUpdateMutation } from '@/database/categories/update-mutation.ts';
import { UpdateCategoryFormValue } from '@/data-management/categories/data-mutation/forms/form-schemas/update-category-form-schema.ts';
import { CategoryEditor } from '@/data-management/categories/data-mutation/category-editor.tsx';
import { categoryRowDataToFormValue } from '@/data-management/categories/category-row-data-to-form-value.ts';
import { CategoryColor } from '@/database/category-colors/query.ts';
import { CategoryTypesQueryRow } from '@/database/category-types/query.ts';
import { CategoriesQueryRow } from '@/database/categories/categories-query.ts';
import { useEditorContext } from '@/data-management/common/data-mutation/editor-open-state.tsx';
import { MutationErrorDialog } from '@/data-management/common/data-mutation/mutation-error-dialog.tsx';

interface CategoryUpdateButtonProps {
  categoryColors: CategoryColor[];
  categoryTypes: CategoryTypesQueryRow[];
  category: CategoriesQueryRow;
}

export const CategoryUpdateButton = (props: CategoryUpdateButtonProps) => {
  const { categoryColors, categoryTypes, category } = props;
  const { closeEditor } = useEditorContext();
  const { mutate, isPending, status, error, reset } =
    useCategoryUpdateMutation();

  function handleSubmit(formValue: UpdateCategoryFormValue) {
    mutate(
      { id: category.id, category: formValue },
      {
        onSuccess: () => closeEditor(),
      },
    );
  }

  return (
    <>
      {status === 'error' && (
        <MutationErrorDialog
          message={`Nie udało się zaktualizować transakcji: ${category.name}`}
          onReset={reset}
          error={error}
        />
      )}

      <CategoryEditor
        id={String(category.id)}
        category={categoryRowDataToFormValue(category)}
        onSubmit={handleSubmit}
        categoryTypes={categoryTypes}
        categoryColors={categoryColors}
        isPending={isPending}
      />
    </>
  );
};

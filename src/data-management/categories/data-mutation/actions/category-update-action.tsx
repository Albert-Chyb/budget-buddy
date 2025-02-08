import { useCategoryUpdateMutation } from '@/database/categories/update-mutation.ts';
import { CategoryColor } from '@/database/category-colors/query.ts';
import { CategoryTypesQueryRow } from '@/database/category-types/query.ts';
import { CategoriesQueryRow } from '@/database/categories/categories-query.ts';
import { useEditorContext } from '@/data-management/common/data-mutation/editor-open-state.tsx';
import { MutationErrorDialog } from '@/data-management/common/data-mutation/mutation-error-dialog.tsx';
import { RowAction } from '@/data-management/common/data-mutation/row-actions.tsx';
import { Editor } from '@/data-management/common/data-mutation/editor.tsx';
import { toFormValue } from '@/data-management/categories/category-row-data.ts';
import { CategoryForm } from '@/data-management/categories/data-mutation/forms/category-form.tsx';
import { CategoryFormValue } from '@/data-management/categories/data-mutation/forms/form-schemas/category-form-schema.ts';

interface CategoryUpdateActionProps {
  categoryColors: CategoryColor[];
  categoryTypes: CategoryTypesQueryRow[];
  category: CategoriesQueryRow;
}

export const CategoryUpdateAction = (props: CategoryUpdateActionProps) => {
  const { categoryColors, categoryTypes, category } = props;
  const { closeEditor } = useEditorContext();
  const { mutate, isPending, status, error, reset } =
    useCategoryUpdateMutation();

  function handleSubmit(formValue: CategoryFormValue) {
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

      <Editor
        isDismissible={!isPending}
        id={String(category.id)}
      >
        {{
          title: `Edycja kategorii: ${category.name}`,
          description:
            'Po wprowadzeniu żądanych zmian wyślij formularz, aby zachować zmiany',
          trigger: <RowAction>Edytuj</RowAction>,
          form: (
            <CategoryForm
              category={toFormValue(category)}
              onSubmit={handleSubmit}
              categoryTypes={categoryTypes}
              categoryColors={categoryColors}
              isPending={isPending}
            />
          ),
        }}
      </Editor>
    </>
  );
};

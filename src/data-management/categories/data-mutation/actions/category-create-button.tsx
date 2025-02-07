import { CategoryTypesQueryRow } from '@/database/category-types/query.ts';
import { CategoryColor } from '@/database/category-colors/query.ts';
import { useCreateCategoryMutation } from '@/database/categories/create-mutation.ts';
import { useEditorContext } from '@/data-management/common/data-mutation/editor-open-state.tsx';
import { CreateCategoryFormValue } from '@/data-management/categories/data-mutation/forms/form-schemas/create-category-form-schema.ts';
import { CategoryCreator } from '@/data-management/categories/data-mutation/category-creator.tsx';
import { MutationErrorDialog } from '@/data-management/common/data-mutation/mutation-error-dialog.tsx';

interface CategoryCreateButtonProps {
  categoryTypes: CategoryTypesQueryRow[];
  categoryColors: CategoryColor[];
}

export function CategoryCreateButton(props: CategoryCreateButtonProps) {
  const { categoryColors, categoryTypes } = props;
  const { mutate, isPending, status, reset, error } =
    useCreateCategoryMutation();
  const { closeEditor } = useEditorContext();

  function handleSubmit(formValue: CreateCategoryFormValue) {
    mutate(formValue, {
      onSuccess: () => {
        closeEditor();
      },
    });
  }

  return (
    <>
      {status === 'error' && (
        <MutationErrorDialog
          message='Nie udało się stworzyć nowej kategorii.'
          onReset={reset}
          error={error}
        />
      )}

      <CategoryCreator
        id='category-creator'
        onSubmit={handleSubmit}
        categoryTypes={categoryTypes}
        categoryColors={categoryColors}
        isPending={isPending}
      />
    </>
  );
}

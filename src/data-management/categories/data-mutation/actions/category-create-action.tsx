import { CategoryTypesQueryRow } from '@/database/category-types/query.ts';
import { CategoryColor } from '@/database/category-colors/query.ts';
import { useCreateCategoryMutation } from '@/database/categories/create-mutation.ts';
import { useEditorContext } from '@/data-management/common/data-mutation/editor-open-state.tsx';
import { CreateCategoryFormValue } from '@/data-management/categories/data-mutation/forms/form-schemas/create-category-form-schema.ts';
import { MutationErrorDialog } from '@/data-management/common/data-mutation/mutation-error-dialog.tsx';
import { Editor } from '@/data-management/common/data-mutation/editor.tsx';
import { ResponsiveButton } from '@/data-management/responsive-button.tsx';
import { CirclePlus } from 'lucide-react';
import { CreateCategoryForm } from '@/data-management/categories/data-mutation/forms/create-category-form.tsx';

interface CategoryCreateButtonProps {
  categoryTypes: CategoryTypesQueryRow[];
  categoryColors: CategoryColor[];
}

export function CategoryCreateAction(props: CategoryCreateButtonProps) {
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

      <Editor
        isDismissible={!isPending}
        id='category-creator'
      >
        {{
          title: 'Tworzenie nowej kategorii',
          description:
            'Po wypełnieniu formularza wyślij go, aby dodać nową kategorię',
          trigger: (
            <ResponsiveButton
              variant='secondary'
              icon={<CirclePlus />}
              label='Nowa kategoria'
            />
          ),
          form: (
            <CreateCategoryForm
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
}

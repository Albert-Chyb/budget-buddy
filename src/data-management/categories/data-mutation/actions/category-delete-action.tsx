import { useCategoryDeleteMutation } from '@/database/categories/delete-mutation.ts';
import { MutationErrorDialog } from '@/data-management/common/data-mutation/mutation-error-dialog.tsx';
import { useState } from 'react';
import { ConfirmationDialog } from '@/components/confirmation-dialog.tsx';
import { RowAction } from '@/data-management/common/data-mutation/row-actions.tsx';
import { CategoriesQueryRow } from '@/database/categories/categories-query.ts';
import { toDeleteMutationVariables } from '@/data-management/categories/category-row-data.ts';

interface CategoryDeleteActionProps {
  category: CategoriesQueryRow;
}

export const CategoryDeleteAction = ({
  category,
}: CategoryDeleteActionProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const { mutate, isPending, error, status, reset } =
    useCategoryDeleteMutation();

  function handleDeleteConfirmation() {
    mutate(toDeleteMutationVariables(category), {
      onSettled: () => setIsOpened(false),
    });
  }

  return (
    <>
      {status === 'error' && (
        <MutationErrorDialog
          message={`Nie udało się usunąć transakcji: ${category.name}`}
          onReset={reset}
          error={error}
        />
      )}

      <ConfirmationDialog
        isOpened={isOpened}
        onOpenedChange={setIsOpened}
        onConfirm={handleDeleteConfirmation}
        isPending={isPending}
        trigger={<RowAction variant='destructive'>Usuń</RowAction>}
        title={`Potwierdzenie usunięcia kategorii: ${category.name}`}
        description='Czy na pewno chcesz usunąć tę kategorię? Tej operacji nie można cofnąć.'
      />
    </>
  );
};

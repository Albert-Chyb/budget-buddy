import { useCategoryDeleteMutation } from '@/database/categories/delete-mutation.ts';
import { Category } from '@/database/categories/category.ts';
import { MutationErrorDialog } from '@/data-management/common/data-mutation/mutation-error-dialog.tsx';
import { useState } from 'react';
import { ConfirmationDialog } from '@/components/confirmation-dialog.tsx';
import { RowAction } from '@/data-management/common/data-mutation/row-actions.tsx';

interface CategoryDeleteAction {
  id: Category['id'];
}

export const CategoryDeleteButton = ({ id }: CategoryDeleteAction) => {
  const [isOpened, setIsOpened] = useState(false);
  const { mutate, isPending, error, status, reset } =
    useCategoryDeleteMutation();

  function handleDeleteConfirmation() {
    mutate(id, {
      onSettled: () => setIsOpened(false),
    });
  }

  return (
    <>
      {status === 'error' && (
        <MutationErrorDialog
          message='Nie udało się usunąć transakcji'
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
        title='Potwierdzenie usunięcia kategorii'
        description='Czy na pewno chcesz usunąć tę kategorię? Tej operacji nie można cofnąć.'
      />
    </>
  );
};

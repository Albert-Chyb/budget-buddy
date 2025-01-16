import { useCategoryDeleteMutation } from '@/database/categories/delete-mutation.ts';
import { Category } from '@/database/categories/category.ts';
import { MutationErrorDialog } from '@/data-management/data-mutation/mutation-error-dialog.tsx';
import { useState } from 'react';
import { ConfirmationDialog } from '@/components/confirmation-dialog.tsx';
import { Button } from '@/components/button.tsx';

interface CategoryDeleteButton {
  id: Category['id'];
}

export const CategoryDeleteButton = ({ id }: CategoryDeleteButton) => {
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
        trigger={<Button variant='destructive'>Usuń</Button>}
        title='Potwierdzenie usunięcia kategorii'
        description='Czy na pewno chcesz usunąć tę kategorię? Tej operacji nie można cofnąć.'
      />
    </>
  );
};

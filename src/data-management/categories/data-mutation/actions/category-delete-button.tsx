import { useCategoryDeleteMutation } from '@/database/categories/delete-mutation.ts';
import { Category } from '@/database/categories/category.ts';
import { MutationErrorDialog } from '@/data-management/data-mutation/mutation-error-dialog.tsx';
import { useState } from 'react';
import { CategoryDeleteConfirmationAlert } from '@/data-management/categories/data-mutation/actions/category-delete-confirmation-alert.tsx';

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

      <CategoryDeleteConfirmationAlert
        isOpened={isOpened}
        onOpenedChange={setIsOpened}
        onConfirm={handleDeleteConfirmation}
        isPending={isPending}
      />
    </>
  );
};

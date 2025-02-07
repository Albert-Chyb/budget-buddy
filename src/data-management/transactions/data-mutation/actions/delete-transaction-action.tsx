import { useDeleteTransactionMutation } from '@/database/transactions/delete-transaction-mutation.ts';
import { MutationErrorDialog } from '@/data-management/common/data-mutation/mutation-error-dialog.tsx';
import { ConfirmationDialog } from '@/components/confirmation-dialog.tsx';
import { useState } from 'react';
import { Transaction } from '@/database/transactions/transaction.ts';
import { RowAction } from '@/data-management/common/data-mutation/row-actions.tsx';

export interface DeleteTransactionActionProps {
  id: Transaction['id'];
}

export const DeleteTransactionAction = ({
  id,
}: DeleteTransactionActionProps) => {
  const { status, error, reset, mutate, isPending } =
    useDeleteTransactionMutation();
  const [isOpened, setIsOpened] = useState(false);

  function handleConfirmation() {
    mutate(id, {
      onSettled: () => setIsOpened(false),
    });
  }

  return (
    <>
      {status === 'error' && (
        <MutationErrorDialog
          message='Nie udało się usunąć tranksacji'
          onReset={reset}
          error={error}
        />
      )}

      <ConfirmationDialog
        isOpened={isOpened}
        onOpenedChange={setIsOpened}
        isPending={isPending}
        onConfirm={handleConfirmation}
        trigger={<RowAction variant='destructive'>Usuń</RowAction>}
        title='Potwierdź czynność'
        description='Czy chcesz usunąć transakcje ?'
      />
    </>
  );
};

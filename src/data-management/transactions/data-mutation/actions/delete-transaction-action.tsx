import { useDeleteTransactionMutation } from '@/database/transactions/delete-transaction-mutation.ts';
import { MutationErrorDialog } from '@/data-management/common/data-mutation/mutation-error-dialog.tsx';
import { ConfirmationDialog } from '@/components/confirmation-dialog.tsx';
import { useState } from 'react';
import { RowAction } from '@/data-management/common/data-mutation/row-actions.tsx';
import { TransactionsQueryRow } from '@/database/transactions/transactions-query.ts';
import { toDeleteMutationVariables } from '@/data-management/transactions/transaction-row-data.ts';

export interface DeleteTransactionActionProps {
  transaction: TransactionsQueryRow;
}

export const DeleteTransactionAction = ({
  transaction,
}: DeleteTransactionActionProps) => {
  const { status, error, reset, mutate, isPending } =
    useDeleteTransactionMutation();
  const [isOpened, setIsOpened] = useState(false);

  function handleConfirmation() {
    mutate(toDeleteMutationVariables(transaction), {
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

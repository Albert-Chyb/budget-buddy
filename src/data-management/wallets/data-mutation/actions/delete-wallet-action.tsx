import { useDeleteWalletMutation } from '@/database/wallets/delete-mutation.ts';
import { MutationErrorDialog } from '@/data-management/common/data-mutation/mutation-error-dialog.tsx';
import { Wallet } from '@/database/wallets/wallet.ts';
import { ConfirmationDialog } from '@/components/confirmation-dialog.tsx';
import { useState } from 'react';
import { RowAction } from '@/data-management/common/data-mutation/row-actions.tsx';

interface DeleteWalletActionProps {
  id: Wallet['id'];
}

export const DeleteWalletAction = ({ id }: DeleteWalletActionProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const { mutate, isPending, status, error, reset } = useDeleteWalletMutation();

  function handleConfirmation() {
    mutate(id, {
      onSettled: () => setIsOpened(false),
    });
  }

  return (
    <>
      {status === 'error' && (
        <MutationErrorDialog
          message='Nie udało się usunąć portfela'
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
        title='Potwierdzenie usunięcia portfela'
        description='Czy na pewno chcesz usunąć ten portfel? Tej operacji nie można cofnąć.'
      />
    </>
  );
};

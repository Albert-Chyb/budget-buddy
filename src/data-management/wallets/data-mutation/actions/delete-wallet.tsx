import { useDeleteWalletMutation } from '@/database/wallets/delete-mutation.ts';
import { MutationErrorDialog } from '@/data-management/data-mutation/mutation-error-dialog.tsx';
import { Wallet } from '@/database/wallets/wallet.ts';
import { ConfirmationDialog } from '@/components/confirmation-dialog.tsx';
import { useState } from 'react';
import { Button } from '@/components/button.tsx';

interface DeleteWalletButtonProps {
  id: Wallet['id'];
}

export const DeleteWalletButton = ({ id }: DeleteWalletButtonProps) => {
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
        trigger={
          <Button
            variant='destructive'
            size='sm'
          >
            Usuń
          </Button>
        }
        title='Potwierdzenie usunięcia portfela'
        description='Czy na pewno chcesz usunąć ten portfel? Tej operacji nie można cofnąć.'
      />
    </>
  );
};

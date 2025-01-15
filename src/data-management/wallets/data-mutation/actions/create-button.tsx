import { useCreateWalletMutation } from '@/database/wallets/create-mutation.ts';
import { WalletCreator } from '@/data-management/wallets/data-mutation/wallet-creator.tsx';
import { MutationErrorDialog } from '@/data-management/data-mutation/mutation-error-dialog.tsx';
import { CreateWalletFormValue } from '@/data-management/wallets/data-mutation/forms/create-wallet-form-schema.ts';
import { useEditorContext } from '@/data-management/data-mutation/editor-open-state.tsx';

export const WalletCreateButton = () => {
  const { mutate, isPending, error, status, reset } = useCreateWalletMutation();
  const { closeEditor } = useEditorContext();

  const handleSubmit = (formValue: CreateWalletFormValue) => {
    mutate(formValue, {
      onSuccess: () => {
        closeEditor();
      },
    });
  };

  return (
    <>
      {status === 'error' && (
        <MutationErrorDialog
          message='Nie udało się stworzyć portfela'
          onReset={reset}
          error={error}
        />
      )}

      <WalletCreator
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </>
  );
};

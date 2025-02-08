import { useCreateWalletMutation } from '@/database/wallets/create-mutation.ts';
import { WalletCreator } from '@/data-management/wallets/data-mutation/wallet-creator.tsx';
import { MutationErrorDialog } from '@/data-management/common/data-mutation/mutation-error-dialog.tsx';
import { CreateWalletFormValue } from '@/data-management/wallets/data-mutation/forms/form-schemas/create-wallet-form-schema.ts';
import { useEditorContext } from '@/data-management/common/data-mutation/editor-open-state.tsx';

export const WalletCreateAction = () => {
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

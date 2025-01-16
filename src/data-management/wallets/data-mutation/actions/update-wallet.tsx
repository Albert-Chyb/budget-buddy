import { useUpdateWalletMutation } from '@/database/wallets/update-mutation.ts';
import { MutationErrorDialog } from '@/data-management/data-mutation/mutation-error-dialog.tsx';
import { WalletEditor } from '@/data-management/wallets/data-mutation/wallet-editor.tsx';
import { useEditorContext } from '@/data-management/data-mutation/editor-open-state.tsx';
import { UpdateWalletFormValue } from '@/data-management/wallets/data-mutation/forms/form-schemas/update-wallet-form-schema.ts';
import { WalletsQueryRecord } from '@/database/wallets/wallets-query.ts';

export interface UpdateWalletButtonProps {
  wallet: WalletsQueryRecord;
}

export const UpdateWalletButton = ({ wallet }: UpdateWalletButtonProps) => {
  const { mutate, isPending, error, status, reset } = useUpdateWalletMutation();
  const { closeEditor } = useEditorContext();

  const handleSubmit = (formValue: UpdateWalletFormValue) => {
    mutate(
      { id: wallet.id, formValue },
      {
        onSuccess: () => closeEditor(),
      },
    );
  };

  return (
    <>
      {status === 'error' && (
        <MutationErrorDialog
          message={`Nie udało się zaktualizować portfela ${wallet.name}`}
          onReset={reset}
          error={error}
        />
      )}

      <WalletEditor
        id={String(wallet.id)}
        onSubmit={handleSubmit}
        isPending={isPending}
        wallet={wallet}
      />
    </>
  );
};

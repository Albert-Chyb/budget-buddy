import { useUpdateWalletMutation } from '@/database/wallets/update-mutation.ts';
import { MutationErrorDialog } from '@/data-management/common/data-mutation/mutation-error-dialog.tsx';
import { useEditorContext } from '@/data-management/common/data-mutation/editor-open-state.tsx';
import { UpdateWalletFormValue } from '@/data-management/wallets/data-mutation/forms/form-schemas/update-wallet-form-schema.ts';
import { WalletsQueryRecord } from '@/database/wallets/wallets-query.ts';
import { RowAction } from '@/data-management/common/data-mutation/row-actions.tsx';
import { UpdateWalletForm } from '@/data-management/wallets/data-mutation/forms/update-wallet-form.tsx';
import { Editor } from '@/data-management/common/data-mutation/editor.tsx';

export interface UpdateWalletActionProps {
  wallet: WalletsQueryRecord;
}

export const UpdateWalletAction = ({ wallet }: UpdateWalletActionProps) => {
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

      <Editor
        id={String(wallet.id)}
        isDismissible={!isPending}
      >
        {{
          title: `Edycja portfela: ${wallet.name}`,
          description:
            'Po wypełnieniu formularza wyślij go, aby stworzyć zaktualizować portfel',
          trigger: <RowAction>Edytuj</RowAction>,
          form: (
            <UpdateWalletForm
              onSubmit={handleSubmit}
              isPending={isPending}
              wallet={wallet}
            />
          ),
        }}
      </Editor>
    </>
  );
};

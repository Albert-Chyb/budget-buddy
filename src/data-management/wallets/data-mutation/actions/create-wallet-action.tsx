import { useCreateWalletMutation } from '@/database/wallets/create-mutation.ts';
import { MutationErrorDialog } from '@/data-management/common/data-mutation/mutation-error-dialog.tsx';
import { CreateWalletFormValue } from '@/data-management/wallets/data-mutation/forms/form-schemas/create-wallet-form-schema.ts';
import { useEditorContext } from '@/data-management/common/data-mutation/editor-open-state.tsx';
import { ResponsiveButton } from '@/data-management/responsive-button.tsx';
import { Plus } from 'lucide-react';
import { CreateWalletForm } from '@/data-management/wallets/data-mutation/forms/create-wallet-form.tsx';
import { Editor } from '@/data-management/common/data-mutation/editor.tsx';

export const UpdateWalletAction = () => {
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

      <Editor
        id='wallet-editor'
        isDismissible={!isPending}
      >
        {{
          title: 'Nowy portfel',
          description:
            'Po wypełnieniu formularza wyślij go, aby stworzyć nowy portfel',
          trigger: (
            <ResponsiveButton
              icon={<Plus />}
              label='Nowy portfel'
            />
          ),
          form: (
            <CreateWalletForm
              isPending={isPending}
              onSubmit={handleSubmit}
            />
          ),
        }}
      </Editor>
    </>
  );
};

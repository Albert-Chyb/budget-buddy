import {
  Editor,
  EditorProps,
} from '@/data-management/data-mutation/editor.tsx';
import {
  UpdateWalletForm,
  UpdateWalletFormProps,
} from '@/data-management/wallets/data-mutation/forms/update-wallet-form.tsx';
import { Button } from '@/components/button.tsx';

export type WalletEditorProps = UpdateWalletFormProps & Pick<EditorProps, 'id'>;

export const WalletEditor = ({ id, ...formProps }: WalletEditorProps) => {
  return (
    <Editor
      id={id}
      isDismissible={!formProps.isPending}
    >
      {{
        title: `Edycja portfela: ${formProps.wallet.name}`,
        description:
          'Po wypełnieniu formularza wyślij go, aby stworzyć zaktualizować portfel',
        trigger: <Button size='sm'>Edytuj</Button>,
        form: <UpdateWalletForm {...formProps} />,
      }}
    </Editor>
  );
};

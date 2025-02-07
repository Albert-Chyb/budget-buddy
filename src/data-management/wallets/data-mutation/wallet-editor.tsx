import {
  Editor,
  EditorProps,
} from '@/data-management/common/data-mutation/editor.tsx';
import {
  UpdateWalletForm,
  UpdateWalletFormProps,
} from '@/data-management/wallets/data-mutation/forms/update-wallet-form.tsx';
import { RowAction } from '@/data-management/common/data-mutation/row-actions.tsx';

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
        trigger: <RowAction>Edytuj</RowAction>,
        form: <UpdateWalletForm {...formProps} />,
      }}
    </Editor>
  );
};

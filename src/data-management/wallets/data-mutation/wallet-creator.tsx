import { Editor } from '@/data-management/common/data-mutation/editor.tsx';
import { ResponsiveButton } from '@/data-management/responsive-button.tsx';
import { Plus } from 'lucide-react';
import {
  CreateWalletForm,
  CreateWalletFormProps,
} from '@/data-management/wallets/data-mutation/forms/create-wallet-form.tsx';

export type WalletCreatorProps = CreateWalletFormProps;

export const WalletCreator = ({
  isPending,
  ...formProps
}: WalletCreatorProps) => {
  return (
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
            {...formProps}
          />
        ),
      }}
    </Editor>
  );
};

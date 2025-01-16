import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  updateWalletFormSchema,
  UpdateWalletFormValue,
} from '@/data-management/wallets/data-mutation/forms/form-schemas/update-wallet-form-schema.ts';
import { Form } from '@/components/form.tsx';
import { WalletNameFormField } from '@/data-management/wallets/data-mutation/forms/form-fields/wallet-name.tsx';
import { PendingButton } from '@/components/pending-button.tsx';
import { WalletsQueryRecord } from '@/database/wallets/wallets-query.ts';

export interface UpdateWalletFormProps {
  onSubmit: (formValue: UpdateWalletFormValue) => void;
  isPending: boolean;
  wallet: WalletsQueryRecord;
}

export const UpdateWalletForm = ({
  onSubmit,
  isPending,
  wallet,
}: UpdateWalletFormProps) => {
  const form = useForm<UpdateWalletFormValue>({
    resolver: zodResolver(updateWalletFormSchema),
    defaultValues: {
      name: wallet.name,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2'
      >
        <WalletNameFormField<UpdateWalletFormValue> name='name' />

        <PendingButton
          isPending={isPending}
          className='w-full'
        >
          Zapisz
        </PendingButton>
      </form>
    </Form>
  );
};

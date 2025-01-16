import { useForm } from 'react-hook-form';
import { WalletNameFormField } from '@/data-management/wallets/data-mutation/forms/form-fields/wallet-name.tsx';
import { WalletBalanceFormField } from '@/data-management/wallets/data-mutation/forms/form-fields/wallet-balance.tsx';
import { PendingButton } from '@/components/pending-button.tsx';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createWalletFormSchema,
  CreateWalletFormValue,
} from '@/data-management/wallets/data-mutation/forms/create-wallet-form-schema.ts';
import { Form } from '@/components/form.tsx';

export interface CreateWalletFormProps {
  onSubmit: (formValue: CreateWalletFormValue) => void;
  isPending: boolean;
}

export const CreateWalletForm = ({
  onSubmit,
  isPending,
}: CreateWalletFormProps) => {
  const form = useForm<CreateWalletFormValue>({
    resolver: zodResolver(createWalletFormSchema),
    defaultValues: {
      name: '',
      balance: 0,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2'
      >
        <WalletNameFormField<CreateWalletFormValue> name='name' />

        <WalletBalanceFormField<CreateWalletFormValue> name='balance' />

        <PendingButton
          className='w-full'
          isPending={isPending}
        >
          Zapisz
        </PendingButton>
      </form>
    </Form>
  );
};

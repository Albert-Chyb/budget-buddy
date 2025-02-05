import { WalletNameFormField } from '@/data-management/wallets/data-mutation/forms/form-fields/wallet-name.tsx';
import { PendingButton } from '@/components/pending-button.tsx';
import {
  createWalletFormSchema,
  CreateWalletFormValue,
} from '@/data-management/wallets/data-mutation/forms/form-schemas/create-wallet-form-schema.ts';
import { Form } from '@/components/form.tsx';
import { CurrencyFormField } from '@/data-management/data-mutation/currency-form-field.tsx';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Currency } from '@/helpers/currency.ts';

export interface CreateWalletFormProps {
  onSubmit: (formValue: CreateWalletFormValue) => void;
  isPending: boolean;
}

export const CreateWalletForm = ({
  onSubmit,
  isPending,
}: CreateWalletFormProps) => {
  const form = useForm({
    resolver: zodResolver(createWalletFormSchema),
    defaultValues: {
      name: '',
      balance: new Currency(0),
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2'
      >
        <WalletNameFormField<CreateWalletFormValue> name='name' />

        <CurrencyFormField<CreateWalletFormValue>
          name='balance'
          label='Początkowy balans'
          description='Tego pola nie można później zmienić'
        />

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

import { DefaultValues, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  transactionFormSchema,
  TransactionFormValue,
} from '@/data-management/transactions/data-mutation/forms/form-schemas/transaction-form-schema.ts';
import { Form } from '@/components/form.tsx';
import { CurrencyFormField } from '@/data-management/common/data-mutation/currency-form-field.tsx';
import { CategoryFormField } from '@/data-management/transactions/data-mutation/forms/form-fields/category-form-field.tsx';
import { WalletFormField } from '@/data-management/transactions/data-mutation/forms/form-fields/wallet-form-field.tsx';
import { CategoriesListQueryData } from '@/database/categories/categories-list-query.ts';
import { WalletsListQueryData } from '@/database/wallets/wallets-list-query.ts';
import { PendingButton } from '@/components/pending-button.tsx';
import { DescriptionFormField } from '@/data-management/transactions/data-mutation/forms/form-fields/description-form-field.tsx';
import { Currency } from '@/helpers/currency.ts';

export interface TransactionFormProps {
  categories: CategoriesListQueryData;
  wallets: WalletsListQueryData;
  onSubmit: (formValue: TransactionFormValue) => void;
  isPending: boolean;
  transaction?: DefaultValues<TransactionFormValue>;
}

export const TransactionForm = ({
  categories,
  onSubmit,
  wallets,
  isPending,
  transaction,
}: TransactionFormProps) => {
  const form = useForm<TransactionFormValue>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: transaction ?? {
      amount: new Currency(0),
      description: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2'
      >
        <CurrencyFormField<TransactionFormValue>
          name='amount'
          label='Kwota'
        />

        <CategoryFormField<TransactionFormValue>
          name='category_id'
          categories={categories}
        />

        <WalletFormField<TransactionFormValue>
          name='wallet_id'
          wallets={wallets}
        />

        <DescriptionFormField<TransactionFormValue> name='description' />

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

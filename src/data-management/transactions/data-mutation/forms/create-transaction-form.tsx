import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createTransactionFormSchema,
  CreateTransactionFormValue,
} from '@/data-management/transactions/data-mutation/forms/form-schemas/create-transaction-form-schema.ts';
import { Form } from '@/components/form.tsx';
import { CurrencyFormField } from '@/data-management/data-mutation/currency-form-field.tsx';
import { CategoryFormField } from '@/data-management/transactions/data-mutation/forms/form-fields/category-form-field.tsx';
import { WalletFormField } from '@/data-management/transactions/data-mutation/forms/form-fields/wallet-form-field.tsx';
import { CategoriesListQueryData } from '@/database/categories/categories-list-query.ts';
import { WalletsListQueryData } from '@/database/wallets/wallets-list-query.ts';
import { PendingButton } from '@/components/pending-button.tsx';
import { DescriptionFormField } from '@/data-management/transactions/data-mutation/forms/form-fields/description-form-field.tsx';

export interface CreateTransactionFormProps {
  categories: CategoriesListQueryData;
  wallets: WalletsListQueryData;
  onSubmit: (formValue: CreateTransactionFormValue) => void;
  isPending: boolean;
}

export const CreateTransactionForm = ({
  categories,
  onSubmit,
  wallets,
  isPending,
}: CreateTransactionFormProps) => {
  const form = useForm<CreateTransactionFormValue>({
    resolver: zodResolver(createTransactionFormSchema),
    defaultValues: {
      amount: 0,
      description: '',
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-2'
      >
        <CurrencyFormField<CreateTransactionFormValue>
          name='amount'
          label='Kwota'
        />

        <CategoryFormField<CreateTransactionFormValue>
          name='category_id'
          categories={categories}
        />

        <WalletFormField<CreateTransactionFormValue>
          name='wallet_id'
          wallets={wallets}
        />

        <DescriptionFormField<CreateTransactionFormValue> name='description' />

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

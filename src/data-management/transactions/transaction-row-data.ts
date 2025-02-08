import { TransactionsQueryRow } from '@/database/transactions/transactions-query.ts';
import { DefaultValues } from 'react-hook-form';
import { TransactionFormValue } from '@/data-management/transactions/data-mutation/forms/form-schemas/transaction-form-schema.ts';
import { APP_LOCALE } from '@/localization.ts';

const createdAtDateFormatter = new Intl.DateTimeFormat(APP_LOCALE, {
  timeStyle: 'short',
  dateStyle: 'short',
});

export const toFormValue = (
  transaction: TransactionsQueryRow,
): DefaultValues<TransactionFormValue> => ({
  wallet_id: transaction.wallet.id,
  category_id: transaction.category.id,
  description: transaction.description ?? '',
  amount: transaction.amount,
});

export const toDeleteMutationVariables = (transaction: TransactionsQueryRow) =>
  transaction.id;

export const formatCreatedAtDate = (
  date: TransactionsQueryRow['created_at'],
) => {
  return createdAtDateFormatter.format(date);
};

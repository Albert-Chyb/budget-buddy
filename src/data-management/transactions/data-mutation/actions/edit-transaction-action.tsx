import { WalletsListQueryData } from '@/database/wallets/wallets-list-query.ts';
import { CategoriesListQueryData } from '@/database/categories/categories-list-query.ts';
import { TransactionsQueryRow } from '@/database/transactions/transactions-query.ts';
import { useUpdateTransactionMutation } from '@/database/transactions/update-transaction-mutation.ts';
import { useEditorContext } from '@/data-management/common/data-mutation/editor-open-state.tsx';
import { TransactionFormValue } from '@/data-management/transactions/data-mutation/forms/form-schemas/transaction-form-schema.ts';
import { Editor } from '@/data-management/common/data-mutation/editor.tsx';
import {
  TransactionForm,
  TransactionFormProps,
} from '@/data-management/transactions/data-mutation/forms/transaction-form.tsx';
import { MutationErrorDialog } from '@/data-management/common/data-mutation/mutation-error-dialog.tsx';
import { RowAction } from '@/data-management/common/data-mutation/row-actions.tsx';

export interface EditTransactionActionProps {
  wallets: WalletsListQueryData;
  categories: CategoriesListQueryData;
  transaction: TransactionsQueryRow;
}

export const EditTransactionAction = ({
  wallets,
  categories,
  transaction,
}: EditTransactionActionProps) => {
  const { mutate, isPending, error, reset, status } =
    useUpdateTransactionMutation();
  const { closeEditor } = useEditorContext();

  function handleSubmit(formValue: TransactionFormValue) {
    mutate(
      { id: transaction.id, payload: formValue },
      {
        onSuccess: () => closeEditor(),
      },
    );
  }

  const defaultFormValue: TransactionFormProps['transaction'] = {
    wallet_id: transaction.wallet.id,
    category_id: transaction.category.id,
    description: transaction.description ?? '',
    amount: transaction.amount,
  };

  return (
    <>
      {status === 'error' && (
        <MutationErrorDialog
          message='Nie udało sie zaktualizować transakcji'
          onReset={reset}
          error={error}
        />
      )}

      <Editor
        id={String(transaction.id)}
        isDismissible={!isPending}
      >
        {{
          title: `Edytuj transakcje`,
          description: 'Po dokonaniu zmian wyślij formularz, aby je zapisać.',
          trigger: <RowAction>Edytuj</RowAction>,
          form: (
            <TransactionForm
              transaction={defaultFormValue}
              wallets={wallets}
              categories={categories}
              onSubmit={handleSubmit}
              isPending={isPending}
            />
          ),
        }}
      </Editor>
    </>
  );
};

import { useCreateTransactionMutation } from '@/database/transactions/create-transaction-mutation.ts';
import { TransactionCreator } from '@/data-management/transactions/data-mutation/transaction-creator.tsx';
import { WalletsListQueryData } from '@/database/wallets/wallets-list-query.ts';
import { CategoriesListQueryData } from '@/database/categories/categories-list-query.ts';
import { MutationErrorDialog } from '@/data-management/data-mutation/mutation-error-dialog.tsx';
import { useEditorContext } from '@/data-management/data-mutation/editor-open-state.tsx';
import { CreateTransactionFormValue } from '@/data-management/transactions/data-mutation/forms/form-schemas/create-transaction-form-schema.ts';

export interface CreateTransactionActionProps {
  wallets: WalletsListQueryData;
  categories: CategoriesListQueryData;
}

export const CreateTransactionAction = ({
  wallets,
  categories,
}: CreateTransactionActionProps) => {
  const { mutate, isPending, status, reset, error } =
    useCreateTransactionMutation();
  const { closeEditor } = useEditorContext();

  function handleSubmit(formValue: CreateTransactionFormValue) {
    mutate(formValue, {
      onSuccess: () => closeEditor(),
    });
  }

  return (
    <>
      {status === 'error' && (
        <MutationErrorDialog
          message='Nie udało się stworzyć nowej transakcji'
          onReset={reset}
          error={error}
        />
      )}

      <TransactionCreator
        wallets={wallets}
        categories={categories}
        isPending={isPending}
        onSubmit={handleSubmit}
      />
    </>
  );
};

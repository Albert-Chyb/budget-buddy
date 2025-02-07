import { useCreateTransactionMutation } from '@/database/transactions/create-transaction-mutation.ts';
import { WalletsListQueryData } from '@/database/wallets/wallets-list-query.ts';
import { CategoriesListQueryData } from '@/database/categories/categories-list-query.ts';
import { MutationErrorDialog } from '@/data-management/common/data-mutation/mutation-error-dialog.tsx';
import { useEditorContext } from '@/data-management/common/data-mutation/editor-open-state.tsx';
import { TransactionFormValue } from '@/data-management/transactions/data-mutation/forms/form-schemas/transaction-form-schema.ts';
import { ResponsiveButton } from '@/data-management/responsive-button.tsx';
import { Plus } from 'lucide-react';
import { TransactionForm } from '@/data-management/transactions/data-mutation/forms/transaction-form.tsx';
import { Editor } from '@/data-management/common/data-mutation/editor.tsx';

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

  function handleSubmit(formValue: TransactionFormValue) {
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

      <Editor
        id='transaction-creator'
        isDismissible={!isPending}
      >
        {{
          title: 'Nowa transakcja',
          description:
            'Po wypełnieniu formularza wyślij go, aby dodać nową transakcje',
          trigger: (
            <ResponsiveButton
              icon={<Plus />}
              label='Nowa transakcja'
            />
          ),
          form: (
            <TransactionForm
              wallets={wallets}
              categories={categories}
              isPending={isPending}
              onSubmit={handleSubmit}
            />
          ),
        }}
      </Editor>
    </>
  );
};

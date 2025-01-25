import {
  CreateTransactionForm,
  CreateTransactionFormProps,
} from '@/data-management/transactions/data-mutation/forms/create-transaction-form.tsx';
import { Editor } from '@/data-management/data-mutation/editor.tsx';
import { ResponsiveButton } from '@/data-management/responsive-button.tsx';
import { Plus } from 'lucide-react';

export const TransactionCreator = (props: CreateTransactionFormProps) => {
  return (
    <Editor
      id='transaction-creator'
      isDismissible={!props.isPending}
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
        form: <CreateTransactionForm {...props} />,
      }}
    </Editor>
  );
};

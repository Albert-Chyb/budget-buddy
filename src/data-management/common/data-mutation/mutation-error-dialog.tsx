import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/alert.tsx';
import { ReactNode } from 'react';

interface OriginalErrorMessageProps {
  message: MutationErrorDialogProps['message'];
}

const OriginalErrorMessage = ({ message }: OriginalErrorMessageProps) => {
  return (
    <div className='border-dashed border-2 py-2 px-4 rounded-md bg-secondary text-secondary-foreground'>
      {message}
    </div>
  );
};

export interface MutationErrorDialogProps {
  message: ReactNode;
  onReset: () => void;
  error: Error;
}

export const MutationErrorDialog = (props: MutationErrorDialogProps) => {
  const { message, onReset, error } = props;

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Błąd!</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>

        <OriginalErrorMessage message={error.message} />

        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onReset()}>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

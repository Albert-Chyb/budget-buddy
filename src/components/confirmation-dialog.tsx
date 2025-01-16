import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/alert.tsx';
import { PendingButton } from '@/components/pending-button.tsx';
import { ReactNode } from 'react';

interface ConfirmationDialogProps {
  isOpened: boolean;
  onOpenedChange: (isOpened: boolean) => void;
  isPending: boolean;
  onConfirm: () => void;
  trigger: ReactNode;
  title: ReactNode;
  description: ReactNode;
}

export const ConfirmationDialog = ({
  isOpened,
  onOpenedChange,
  isPending,
  onConfirm,
  trigger,
  title,
  description,
}: ConfirmationDialogProps) => {
  return (
    <AlertDialog
      open={isOpened}
      onOpenChange={onOpenedChange}
    >
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <PendingButton
            isPending={isPending}
            onClick={onConfirm}
          >
            Ok
          </PendingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

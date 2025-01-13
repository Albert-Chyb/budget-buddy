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
import { Button } from '@/components/button.tsx';
import { PendingButton } from '@/components/pending-button.tsx';

interface CategoryDeleteConfirmationAlertProps {
  isOpened: boolean;
  onOpenedChange: (open: boolean) => void;
  isPending: boolean;
  onConfirm: () => void;
}

export const CategoryDeleteConfirmationAlert = ({
  isOpened,
  onOpenedChange,
  onConfirm,
  isPending,
}: CategoryDeleteConfirmationAlertProps) => {
  return (
    <AlertDialog
      open={isOpened}
      onOpenChange={onOpenedChange}
    >
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>Usuń</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Potwierdzenie usunięcia kategorii</AlertDialogTitle>
          <AlertDialogDescription>
            Czy na pewno chcesz usunąć tę kategorię? Tej operacji nie można
            cofnąć.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <PendingButton
            isPending={isPending}
            onClick={onConfirm}
          >
            Usuń
          </PendingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

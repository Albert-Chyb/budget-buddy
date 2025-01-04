import { useCategoryDeleteMutation } from '@/database/categories/delete-mutation.ts';
import { PendingButton } from '@/components/pending-button.tsx';
import { Category } from '@/database/categories/category.ts';

interface CategoryDeleteButton {
  id: Category['id'];
}

export const CategoryDeleteButton = ({ id }: CategoryDeleteButton) => {
  const { mutate, isPending } = useCategoryDeleteMutation();

  function handleDeleteBtnClick() {
    mutate(id);
  }

  return (
    <PendingButton
      variant='destructive'
      onClick={handleDeleteBtnClick}
      isPending={isPending}
    >
      Usuń
    </PendingButton>
  );
};

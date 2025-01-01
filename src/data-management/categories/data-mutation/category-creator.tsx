import { Editor } from '@/data-management/data-mutation/editor.tsx';
import { Button } from '@/components/button.tsx';
import {
  CreateCategoryForm,
  CreateCategoryFormProps,
} from '@/data-management/categories/data-mutation/create-category-form.tsx';

export type CategoryCreatorProps = CreateCategoryFormProps;

export function CategoryCreator(props: CategoryCreatorProps) {
  const trigger = (
    <Button
      variant='secondary'
      className='ml-auto mr-6'
    >
      Nowa kategoria
    </Button>
  );
  const form = <CreateCategoryForm {...props} />;

  return (
    <Editor isDismissible={!props.isPending}>
      {{
        trigger,
        form,
      }}
    </Editor>
  );
}

import { Editor } from '@/data-management/data-mutation/editor.tsx';
import { Button } from '@/components/button.tsx';
import {
  CategoryForm,
  CategoryFormProps,
} from '@/data-management/categories/category-form.tsx';

export type CategoryCreatorProps = CategoryFormProps;

export function CategoryCreator(props: CategoryCreatorProps) {
  const trigger = (
    <Button
      variant='secondary'
      className='ml-auto mr-6'
    >
      Nowa kategoria
    </Button>
  );
  const form = <CategoryForm {...props} />;

  return (
    <Editor>
      {{
        trigger,
        form,
      }}
    </Editor>
  );
}

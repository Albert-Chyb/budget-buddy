import { Editor } from '@/data-management/data-mutation/editor.tsx';
import { Button } from '@/components/button.tsx';
import {
  CreateCategoryForm,
  CreateCategoryFormProps,
} from '@/data-management/categories/data-mutation/forms/create-category-form.tsx';

export type CategoryCreatorProps = CreateCategoryFormProps & { id: string };

export function CategoryCreator(props: CategoryCreatorProps) {
  const { id, ...formProps } = props;
  const trigger = <Button variant='secondary'>Nowa kategoria</Button>;
  const form = <CreateCategoryForm {...formProps} />;

  return (
    <Editor
      isDismissible={!formProps.isPending}
      id={id}
    >
      {{
        trigger,
        form,
      }}
    </Editor>
  );
}

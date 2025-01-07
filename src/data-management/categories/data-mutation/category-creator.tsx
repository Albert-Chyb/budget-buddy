import { Editor } from '@/data-management/data-mutation/editor.tsx';
import {
  CreateCategoryForm,
  CreateCategoryFormProps,
} from '@/data-management/categories/data-mutation/forms/create-category-form.tsx';
import { ResponsiveButton } from '@/data-management/responsive-button.tsx';
import { CirclePlus } from 'lucide-react';

export type CategoryCreatorProps = CreateCategoryFormProps & { id: string };

export function CategoryCreator(props: CategoryCreatorProps) {
  const { id, ...formProps } = props;
  const trigger = (
    <ResponsiveButton
      variant='secondary'
      icon={<CirclePlus />}
      label='Nowa kategoria'
    />
  );
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

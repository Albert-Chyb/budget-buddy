import { Editor } from '@/data-management/data-mutation/editor.tsx';
import {
  UpdateCategoryForm,
  UpdateCategoryFormProps,
} from '@/data-management/categories/data-mutation/update-category-form.tsx';
import { Button } from '@/components/button.tsx';

type CategoryEditorProps = UpdateCategoryFormProps & { id: string };

export function CategoryEditor(props: CategoryEditorProps) {
  return (
    <Editor
      isDismissible={!props.isPending}
      id={props.id}
    >
      {{
        trigger: <Button variant='secondary'>Edytuj</Button>,
        form: <UpdateCategoryForm {...props} />,
      }}
    </Editor>
  );
}

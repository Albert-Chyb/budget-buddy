import { Editor } from '@/data-management/data-mutation/editor.tsx';
import {
  UpdateCategoryForm,
  UpdateCategoryFormProps,
} from '@/data-management/categories/data-mutation/forms/update-category-form.tsx';
import { RowAction } from '@/data-management/data-mutation/row-actions.tsx';

type CategoryEditorProps = UpdateCategoryFormProps & { id: string };

export function CategoryEditor(props: CategoryEditorProps) {
  return (
    <Editor
      isDismissible={!props.isPending}
      id={props.id}
    >
      {{
        title: 'Edycja kategorii',
        description:
          'Po wprowadzeniu żądanych zmian wyślij formularz, aby zachować zmiany',
        trigger: <RowAction>Edytuj</RowAction>,
        form: <UpdateCategoryForm {...props} />,
      }}
    </Editor>
  );
}

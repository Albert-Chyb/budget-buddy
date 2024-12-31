import { Editor } from '@/data-management/data-mutation/editor.tsx';
import { Button } from '@/components/button.tsx';
import { Pen } from 'lucide-react';
import {
  UpdateCategoryForm,
  UpdateCategoryFormProps,
} from '@/data-management/categories/data-mutation/update-category-form.tsx';

type CategoryEditorProps = UpdateCategoryFormProps;

export function CategoryEditor(props: CategoryEditorProps) {
  return (
    <Editor>
      {{
        trigger: (
          <Button variant='secondary'>
            <Pen /> Edytuj
          </Button>
        ),
        form: <UpdateCategoryForm {...props} />,
      }}
    </Editor>
  );
}

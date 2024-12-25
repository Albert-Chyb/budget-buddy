import { Editor } from '@/data-management/data-mutation/editor.tsx';
import { Button } from '@/components/button.tsx';
import { Pen } from 'lucide-react';
import {
  CategoryForm,
  CategoryFormProps,
} from '@/data-management/categories/data-mutation/category-form.tsx';

type CategoryEditorProps = CategoryFormProps;

export function CategoryEditor(props: CategoryEditorProps) {
  return (
    <Editor>
      {{
        trigger: (
          <Button variant='secondary'>
            <Pen /> Edytuj
          </Button>
        ),
        form: <CategoryForm {...props} />,
      }}
    </Editor>
  );
}

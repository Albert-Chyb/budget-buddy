import { Editor } from '@/data-management/data-mutation/editor.tsx';
import { Button } from '@/components/button.tsx';
import { Pen } from 'lucide-react';

export function CategoryEditor() {
  return (
    <Editor>
      {{
        trigger: (
          <Button variant='secondary'>
            <Pen /> Edytuj
          </Button>
        ),
        form: '[FORM PLACEHOLDER]',
      }}
    </Editor>
  );
}

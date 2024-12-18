import { Editor } from '@/data-management/editor.tsx';
import { Button } from '@/components/button.tsx';

export function CategoryCreator() {
  return (
    <Editor>
      {{
        trigger: (
          <Button
            variant='secondary'
            className='ml-auto mr-6'
          >
            Nowa kategoria
          </Button>
        ),
        form: '[FORM_PLACEHOLDER]',
      }}
    </Editor>
  );
}

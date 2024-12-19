import { CategoryEditor } from '@/data-management/categories/category-editor.tsx';
import { Button } from '@/components/button.tsx';
import { Trash } from 'lucide-react';

export function CategoryActions() {
  return (
    <>
      <CategoryEditor />

      <Button variant='destructive'>
        <Trash /> Usuń
      </Button>
    </>
  );
}

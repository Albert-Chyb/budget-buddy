import { Button } from '@/components/button.tsx';
import { Eraser, FilterX } from 'lucide-react';
import { DataTableProp } from '@/data-management/common/data-view/table-type.ts';

interface TableResetsProps {
  table: DataTableProp;
}

export function TableResets({ table }: TableResetsProps) {
  return (
    <section className='space-x-2'>
      <Button
        onClick={() => table.resetColumnFilters()}
        size='sm'
      >
        <FilterX /> Wyczyść filtry
      </Button>

      <Button
        onClick={() => table.resetSorting()}
        size='sm'
      >
        <Eraser /> Wyczyść sortowanie
      </Button>
    </section>
  );
}

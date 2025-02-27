import { Button } from '@/components/button.tsx';
import { DataTableProp } from '@/data-management/common/data-view/table-type.ts';
import { Eraser, FilterX } from 'lucide-react';

interface TableResetsProps {
  table: DataTableProp;
}

export function TableResets({ table }: TableResetsProps) {
  return (
    <section className='space-x-2'>
      <Button
        onClick={() => table.resetColumnFilters()}
        size='sm'
        data-testid='reset-filters-btn'
      >
        <FilterX /> Wyczyść filtry
      </Button>

      <Button
        onClick={() => table.resetSorting()}
        size='sm'
        data-testid='reset-sorting-btn'
      >
        <Eraser /> Wyczyść sortowanie
      </Button>
    </section>
  );
}

import { Button } from '@/components/button.tsx';
import { Eraser, FilterX } from 'lucide-react';
import { DataTableProp } from '@/data-management/data-view/table-type.ts';

interface TableResetsProps {
  table: DataTableProp;
}

export function TableResets({ table }: TableResetsProps) {
  return (
    <div className='ml-auto space-x-2'>
      <Button onClick={() => table.resetColumnFilters()}>
        <FilterX /> Wyczyść filtry
      </Button>

      <Button onClick={() => table.resetSorting()}>
        <Eraser /> Wyczyść sortowanie
      </Button>
    </div>
  );
}

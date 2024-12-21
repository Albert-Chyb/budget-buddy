import { Table } from '@tanstack/react-table';
import { Button } from '@/components/button.tsx';
import { Eraser, FilterX } from 'lucide-react';

interface TableResetsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
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

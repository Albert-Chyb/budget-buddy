import { PropsWithChildren } from 'react';
import { Button } from '@/components/button.tsx';
import { FilterX } from 'lucide-react';
import { Table } from '@tanstack/react-table';

export interface FiltersProps extends PropsWithChildren {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  table: Table<any>;
}

export function Filters(props: FiltersProps) {
  const { children, table } = props;
  return (
    <section>
      <h2 className='typography-large mb-2'>Filtry</h2>

      <div className='flex gap-2 flex-wrap'>
        <ul
          className='flex gap-4'
          aria-label='Lista filtrów'
        >
          {children}
        </ul>

        <Button
          className='ml-auto'
          onClick={() => table.resetColumnFilters()}
        >
          <FilterX /> Wyczyść filtry
        </Button>
      </div>
    </section>
  );
}

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/pagination.tsx';
import { Table } from '@tanstack/react-table';
import { PageSizeSelect } from '@/data-management/pagination/page-size-select.tsx';
import { usePrevAndNextPageSearchParams } from '@/data-management/pagination/pagination-state.ts';
import { PageIndicator } from '@/data-management/pagination/page-indicator.tsx';

export interface TablePaginationProps {
  table: Table<unknown>;
}

export function TablePagination({ table }: TablePaginationProps) {
  const [prevPage, nextPage] = usePrevAndNextPageSearchParams();
  return (
    <div className='flex items-center gap-x-2'>
      <PageIndicator table={table} />

      <Pagination className='ml-auto'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              disabled={!table.getCanPreviousPage()}
              to='.'
              search={prevPage}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              disabled={!table.getCanNextPage()}
              to='.'
              search={nextPage}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <PageSizeSelect table={table} />
    </div>
  );
}

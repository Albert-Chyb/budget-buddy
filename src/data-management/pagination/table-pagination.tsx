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

export interface TablePaginationProps {
  table: Table<unknown>;
}

export function TablePagination({ table }: TablePaginationProps) {
  const [prevPage, nextPage] = usePrevAndNextPageSearchParams();
  return (
    <div className='flex items-center gap-x-2'>
      <span>
        Strona {table.getState().pagination.pageIndex + 1} z{' '}
        {table.getPageCount()}
      </span>

      <Pagination className='justify-end w-min ml-auto mr-0'>
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

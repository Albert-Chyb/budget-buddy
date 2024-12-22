import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/pagination.tsx';
import { Table } from '@tanstack/react-table';

function getNextPageIndex(currentPageIndex: number | undefined) {
  if (currentPageIndex === undefined) return 0;
  return currentPageIndex + 1;
}

function getPrevPageIndex(currentPageIndex: number | undefined) {
  if (currentPageIndex === undefined) return 0;
  return currentPageIndex - 1;
}

export interface TablePaginationProps {
  table: Table<unknown>;
}

export function TablePagination({ table }: TablePaginationProps) {
  return (
    <div className='flex items-center'>
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
              search={(prev) => ({
                ...prev,
                pageIndex: getPrevPageIndex(prev.pageIndex),
              })}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              disabled={!table.getCanNextPage()}
              to='.'
              search={(prev) => ({
                ...prev,
                pageIndex: getNextPageIndex(prev.pageIndex),
              })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

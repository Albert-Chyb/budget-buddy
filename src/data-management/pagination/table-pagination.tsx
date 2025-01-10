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
import { useIsMobile } from '@/data-management/is-mobile.ts';

export interface TablePaginationProps {
  table: Table<unknown>;
}

export function TablePagination({ table }: TablePaginationProps) {
  const [prevPage, nextPage] = usePrevAndNextPageSearchParams();
  const isMobile = useIsMobile();

  const pageSizeSelect = <PageSizeSelect table={table} />;
  const pageIndicator = <PageIndicator table={table} />;
  const paginator = (
    <Pagination>
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
  );

  if (isMobile)
    return (
      <div className='flex flex-wrap items-center justify-center gap-2'>
        <span className='basis-full'>
          <div className='mx-auto w-min'>{paginator}</div>
        </span>
        {pageIndicator}
        {pageSizeSelect}
      </div>
    );

  return (
    <div className='flex items-center gap-x-2'>
      {pageIndicator}

      <div className='ml-auto'>{paginator}</div>

      {pageSizeSelect}
    </div>
  );
}

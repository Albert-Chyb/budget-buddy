import { z } from 'zod';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  functionalUpdate,
  PaginationState,
  Updater,
} from '@tanstack/react-table';

const PAGINATION_PAGE_SIZES = [5, 10, 50, 100] as const;
type PaginationPageSize = (typeof PAGINATION_PAGE_SIZES)[number];
const DEFAULT_PAGE_SIZE: PaginationPageSize = 10;

const pageSizeSchema = z
  .number()
  .int()
  .positive()
  .default(DEFAULT_PAGE_SIZE)
  .catch(DEFAULT_PAGE_SIZE)
  .refine(
    (pageSize: number) =>
      (PAGINATION_PAGE_SIZES as unknown as number[]).includes(pageSize),
    {
      message: `Page size has to be one of: [${PAGINATION_PAGE_SIZES.join(', ')}]`,
    },
  );
const pageIndexSchema = z.number().int().min(0).default(0);
export const paginationStateSchema = z.object({
  pageSize: pageSizeSchema,
  pageIndex: pageIndexSchema,
});

export function usePaginationState() {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false });
  const pagination: PaginationState = {
    pageIndex: searchParams.pageIndex ?? 0,
    pageSize: searchParams.pageSize ?? DEFAULT_PAGE_SIZE,
  };

  function handlePaginationChange(
    paginationOrUpdater: Updater<PaginationState>,
  ) {
    const { pageIndex, pageSize } = functionalUpdate(
      paginationOrUpdater,
      pagination,
    );

    navigate({
      to: '.',
      search: (prev) => ({ ...prev, pageIndex, pageSize }),
    });
  }

  return { pagination, handlePaginationChange };
}

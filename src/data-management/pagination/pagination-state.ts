import { z } from 'zod';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import {
  functionalUpdate,
  PaginationState,
  Updater,
} from '@tanstack/react-table';

export const PAGINATION_PAGE_SIZES = [5, 10, 50, 100] as const;
export type PaginationPageSize = (typeof PAGINATION_PAGE_SIZES)[number];
export const DEFAULT_PAGE_SIZE: PaginationPageSize = 10;

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

const dataManagementRoute = getRouteApi('/_authenticated/_data-management');

export function usePaginationState() {
  const navigate = useNavigate();
  const { pageSize, pageIndex } = dataManagementRoute.useSearch();
  const pagination: PaginationState = {
    pageIndex,
    pageSize,
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

export function usePrevAndNextPageSearchParams() {
  const searchParams = dataManagementRoute.useSearch();
  const currentPageIndex = searchParams.pageIndex;
  const prevPageIndex = currentPageIndex - 1;
  const nextPageIndex = currentPageIndex + 1;
  const prevPage = {
    ...searchParams,
    pageIndex: Math.max(0, prevPageIndex),
  };
  const nextPage = {
    ...searchParams,
    pageIndex: nextPageIndex,
  };

  return [prevPage, nextPage] as const;
}

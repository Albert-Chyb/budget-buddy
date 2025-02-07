import { getRouteApi, useNavigate } from '@tanstack/react-router';
import {
  functionalUpdate,
  PaginationState,
  Updater,
} from '@tanstack/react-table';

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

  return [pagination, handlePaginationChange] as const;
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

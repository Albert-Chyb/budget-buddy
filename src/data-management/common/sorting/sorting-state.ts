import { z } from 'zod';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { functionalUpdate, SortingState, Updater } from '@tanstack/react-table';

const columnSortSchema = z.object({
  id: z.string(),
  desc: z.boolean(),
});

export const sortingSchema = z.array(columnSortSchema).default([]).catch([]);

const dataManagementRoute = getRouteApi('/_authenticated/_data-management');

export const useSortingState = () => {
  const { sorting } = dataManagementRoute.useSearch();
  const navigate = useNavigate();
  const handleSortingChange = (updaterOrValue: Updater<SortingState>) => {
    const newSorting = functionalUpdate(updaterOrValue, sorting);
    navigate({ to: '.', search: (prev) => ({ ...prev, sorting: newSorting }) });
  };

  return [sorting, handleSortingChange] as const;
};

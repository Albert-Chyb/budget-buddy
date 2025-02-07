import { z } from 'zod';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import {
  ColumnFiltersState,
  functionalUpdate,
  Updater,
} from '@tanstack/react-table';

export const columnFilterSchema = z
  .object({
    id: z.string(),
    value: z.unknown(),
  })
  .transform((obj) => ({ ...obj, value: obj.value }));

export const columnFiltersSchema = z
  .array(columnFilterSchema)
  .default([])
  .catch([]);

const dataManagementRoute = getRouteApi('/_authenticated/_data-management');

export const useColumnFiltersState = () => {
  const { columnFilters } = dataManagementRoute.useSearch();
  const navigate = useNavigate();
  const handleColumnFiltersChange = (
    updaterOrValue: Updater<ColumnFiltersState>,
  ) => {
    const newColumnFilters = functionalUpdate(updaterOrValue, columnFilters);
    navigate({
      to: '.',
      search: (prev) => ({ ...prev, columnFilters: newColumnFilters }),
    });
  };

  return [columnFilters, handleColumnFiltersChange] as const;
};

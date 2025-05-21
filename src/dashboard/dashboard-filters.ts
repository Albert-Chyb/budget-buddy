import { DashboardSearchParams } from '@/routes/_authenticated/index';
import { getRouteApi } from '@tanstack/react-router';

const dashboardRoute = getRouteApi('/_authenticated/');

/**
 * Manages dashboard filters stored in URL params, converting between Set and Array.
 *
 * @param key - The search param key to manage
 * @returns A tuple containing:
 *          [0] Current filter values as Set
 *          [1] Updater function (accepts Set transformer)
 */
export const useDashboardFilter = <T extends keyof DashboardSearchParams>(
  key: T,
) => {
  const search = dashboardRoute.useSearch();
  const navigate = dashboardRoute.useNavigate();

  const handleFilterChange = (
    updater: (
      prev: Set<DashboardSearchParams[T][number]>,
    ) => Set<DashboardSearchParams[T][number]>,
  ) => {
    navigate({
      search: (prev) => ({
        ...prev,
        [key]: Array.from(updater(new Set(prev[key]))),
      }),
    });
  };

  return [new Set(search[key]), handleFilterChange] as const;
};

export const useDashboardFilters = () => {
  const [selectedWallets, handleSelectedWalletsChange] =
    useDashboardFilter('selectedWallets');
  const [selectedCategories, handleSelectedCategoriesChange] =
    useDashboardFilter('selectedCategories');
  const [selectedYears, handleSelectedYearsChange] =
    useDashboardFilter('selectedYears');
  const [selectedMonths, handleSelectedMonthsChange] =
    useDashboardFilter('selectedMonths');
  const navigate = dashboardRoute.useNavigate();

  const handleClear = () => {
    navigate({ search: {} });
  };

  return {
    state: {
      selectedWallets,
      selectedCategories,
      selectedYears,
      selectedMonths,
    },
    handleSelectedWalletsChange,
    handleSelectedCategoriesChange,
    handleSelectedYearsChange,
    handleSelectedMonthsChange,
    clear: handleClear,
  };
};

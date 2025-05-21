import { Button } from '@/components/button';
import { CategoriesListQueryData } from '@/database/categories/categories-list-query';
import { WalletsListQueryData } from '@/database/wallets/wallets-list-query';
import { Eraser } from 'lucide-react';
import { CategoryPicker } from './category-picker';
import { useDashboardFilters } from './dashboard-filters';
import { MonthNamePicker } from './month-name-picker';
import { WalletPicker } from './wallet-picker';
import { YearPicker } from './year-picker';

export interface DashboardFiltersProps {
  wallets: WalletsListQueryData;
  categories: CategoriesListQueryData;
  years: number[];
}

export const DashboardFilters = ({
  wallets,
  categories,
  years,
}: DashboardFiltersProps) => {
  const filters = useDashboardFilters();

  return (
    <>
      <WalletPicker
        wallets={wallets}
        selectedWallets={filters.state.selectedWallets}
        onSelectedWalletsChange={filters.handleSelectedWalletsChange}
      />

      <CategoryPicker
        categories={categories}
        selectedCategories={filters.state.selectedCategories}
        onSelectedCategoriesChange={filters.handleSelectedCategoriesChange}
      />

      <YearPicker
        years={years}
        selectedYears={filters.state.selectedYears}
        onSelectedYearsChange={filters.handleSelectedYearsChange}
      />

      <MonthNamePicker
        selectedMonths={filters.state.selectedMonths}
        onSelectedMonthsChange={filters.handleSelectedMonthsChange}
      />

      <Button
        aria-label='Resetuj filtry'
        variant='destructive'
        size='icon'
        onClick={() => filters.clear()}
      >
        <Eraser />
      </Button>
    </>
  );
};

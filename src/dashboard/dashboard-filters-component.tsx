import { Button } from '@/components/button';
import { CategoriesListQueryData } from '@/database/categories/categories-list-query';
import { WalletsListQueryData } from '@/database/wallets/wallets-list-query';
import { useIsMobile } from '@/helpers/is-mobile';
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
  const isMobile = useIsMobile();

  return (
    <>
      <WalletPicker
        wallets={wallets}
        selection={filters.state.selectedWallets}
        onSelectionChange={filters.handleSelectedWalletsChange}
        isMobile={isMobile}
      />

      <CategoryPicker
        categories={categories}
        selection={filters.state.selectedCategories}
        onSelectionChange={filters.handleSelectedCategoriesChange}
        isMobile={isMobile}
      />

      <YearPicker
        years={years}
        selection={filters.state.selectedYears}
        onSelectionChange={filters.handleSelectedYearsChange}
        isMobile={isMobile}
      />

      <MonthNamePicker
        selection={filters.state.selectedMonths}
        onSelectionChange={filters.handleSelectedMonthsChange}
        isMobile={isMobile}
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

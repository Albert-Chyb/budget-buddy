import { Button } from '@/components/button';
import { CategoryPicker } from '@/dashboard/category-picker';
import { useDashboardFilters } from '@/dashboard/dashboard-filters';
import { MonthNamePicker } from '@/dashboard/month-name-picker';
import { WalletPicker } from '@/dashboard/wallet-picker';
import { YearPicker } from '@/dashboard/year-picker';
import { useCategoriesListQuery } from '@/database/categories/categories-list-query';
import { useYearsQuery } from '@/database/dashboard/years-query';
import { useWalletsListQuery } from '@/database/wallets/wallets-list-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { Eraser } from 'lucide-react';
import { z } from 'zod';

const filterSchema = z.array(z.number()).catch([]);

const searchSchema = z.object({
  selectedWallets: filterSchema,
  selectedCategories: filterSchema,
  selectedYears: filterSchema,
  selectedMonths: filterSchema,
});
export type DashboardSearchParams = z.infer<typeof searchSchema>;

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
  validateSearch: zodValidator(searchSchema),
});

function RouteComponent() {
  const { data: wallets, status: walletsStatus } = useWalletsListQuery();
  const { data: categories, status: categoriesStatus } =
    useCategoriesListQuery();
  const { data: years, status: yearsStatus } = useYearsQuery();
  const filters = useDashboardFilters();

  if (
    walletsStatus === 'success' &&
    categoriesStatus === 'success' &&
    yearsStatus === 'success'
  ) {
    return (
      <div className='flex items-center flex-wrap'>
        <h1 className='typography-large'>Statystyki</h1>

        <section className='ml-auto space-x-1'>
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
        </section>
      </div>
    );
  }
}

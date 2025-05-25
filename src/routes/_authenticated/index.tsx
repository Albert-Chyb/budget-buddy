import { useCategoriesListQuery } from '@/database/categories/categories-list-query';
import { useYearsQuery } from '@/database/dashboard/years-query';
import { useWalletsListQuery } from '@/database/wallets/wallets-list-query';
import { createFileRoute } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';

import { DashboardFilters } from '@/dashboard/dashboard-filters-component';
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

  if (
    walletsStatus === 'success' &&
    categoriesStatus === 'success' &&
    yearsStatus === 'success'
  ) {
    return (
      <div className='flex items-center flex-wrap'>
        <h1 className='typography-large'>Statystyki</h1>

        <div className='ml-auto'>
          <DashboardFilters
            wallets={wallets}
            categories={categories}
            years={years}
          />
        </div>
      </div>
    );
  }
}

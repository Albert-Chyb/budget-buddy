import { CategoryPicker } from '@/dashboard/category-picker';
import { MonthNamePicker } from '@/dashboard/month-name-picker';
import { WalletPicker } from '@/dashboard/wallet-picker';
import { YearPicker } from '@/dashboard/year-picker';
import { useCategoriesListQuery } from '@/database/categories/categories-list-query';
import { useYearsQuery } from '@/database/dashboard/years-query';
import { useWalletsListQuery } from '@/database/wallets/wallets-list-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

/*
 * Create a selection for a wallet, category, year and month
 */

export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: wallets, status: walletsStatus } = useWalletsListQuery();
  const { data: categories, status: categoriesStatus } =
    useCategoriesListQuery();
  const { data: years, status: yearsStatus } = useYearsQuery();

  const [selectedWallets, setSelectedWallets] = useState(new Set<number>());
  const [selectedCategories, setSelectedCategories] = useState(
    new Set<number>(),
  );
  const [selectedYears, setSelectedYears] = useState(new Set<number>());
  const [selectedMonths, setSelectedMonths] = useState(new Set<number>());

  if (
    walletsStatus === 'success' &&
    categoriesStatus === 'success' &&
    yearsStatus === 'success'
  ) {
    return (
      <>
        <h1 className='typography-large'>Statystyki</h1>

        <WalletPicker
          wallets={wallets}
          selectedWallets={selectedWallets}
          onSelectedWalletsChange={setSelectedWallets}
        />

        <CategoryPicker
          categories={categories}
          selectedCategories={selectedCategories}
          onSelectedCategoriesChange={setSelectedCategories}
        />

        <YearPicker
          years={years}
          selectedYears={selectedYears}
          onSelectedYearsChange={setSelectedYears}
        />

        <MonthNamePicker
          selectedMonths={selectedMonths}
          onSelectedMonthsChange={setSelectedMonths}
        />
      </>
    );
  }
}

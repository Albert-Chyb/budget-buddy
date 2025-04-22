import { CategoryPicker } from '@/dashboard/category-picker';
import { WalletPicker } from '@/dashboard/wallet-picker';
import { useCategoriesListQuery } from '@/database/categories/categories-list-query';
import { useWalletsListQuery } from '@/database/wallets/wallets-list-query';
import { createFileRoute } from '@tanstack/react-router';

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

  if (walletsStatus === 'success' && categoriesStatus === 'success') {
    return (
      <>
        <h1 className='typography-large'>Statystyki</h1>

        <WalletPicker wallets={wallets} />
        <CategoryPicker categories={categories} />
      </>
    );
  }
}

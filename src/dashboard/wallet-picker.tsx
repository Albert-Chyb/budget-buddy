import { Button } from '@/components/button';
import {
  ResponsiveMultiSelect,
  ResponsiveMultiSelectProps,
} from '@/components/responsive-multi-select';
import { WalletsListQueryData } from '@/database/wallets/wallets-list-query';
import { Wallet } from 'lucide-react';

export interface WalletPickerProps
  extends Pick<
    ResponsiveMultiSelectProps<number>,
    'selection' | 'onSelectionChange'
  > {
  wallets: WalletsListQueryData;
}

export const WalletPicker = ({ wallets, ...rest }: WalletPickerProps) => {
  return (
    <ResponsiveMultiSelect
      title='Wybierz portfel'
      description='Wybierz portfele, dla których chcesz wyświetlić statystyki transakcji'
      isMobile={true}
      options={wallets.map((wallet) => ({
        value: wallet.id,
        label: wallet.name,
      }))}
      {...rest}
    >
      <Button>
        <Wallet /> Portfel
      </Button>
    </ResponsiveMultiSelect>
  );
};

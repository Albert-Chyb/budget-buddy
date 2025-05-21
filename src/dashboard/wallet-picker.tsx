import { Button } from '@/components/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import { WalletSchema } from '@/database/wallets/wallet-schema';
import { WalletsListQueryData } from '@/database/wallets/wallets-list-query';
import { Wallet } from 'lucide-react';

export type WalletPickerValue = Set<WalletSchema['id']>;
export type WalletPickerUpdater = (
  prevSelectedWallets: WalletPickerValue,
) => WalletPickerValue;

export interface WalletPickerProps {
  wallets: WalletsListQueryData;
  selectedWallets: WalletPickerValue;
  onSelectedWalletsChange: (updater: WalletPickerUpdater) => void;
}

export const WalletPicker = ({
  wallets,
  selectedWallets,
  onSelectedWalletsChange,
}: WalletPickerProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-testid='wallet-picker-trigger'>
          <Wallet /> Portfel
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Wybierz portfel</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {wallets.map((wallet) => (
          <DropdownMenuCheckboxItem
            key={wallet.id}
            onSelect={($event) => $event.preventDefault()}
            checked={selectedWallets.has(wallet.id)}
            onCheckedChange={(isChecked) =>
              onSelectedWalletsChange((prev) => {
                const copy = new Set(prev);
                if (isChecked) copy.add(wallet.id);
                else copy.delete(wallet.id);

                return copy;
              })
            }
          >
            {wallet.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

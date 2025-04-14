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
import { Dispatch, SetStateAction, useState } from 'react';

type WalletPickerValue = Set<WalletSchema['id']>;

export interface WalletPickerProps {
  wallets: WalletsListQueryData;
  selectedWallets?: WalletPickerValue;
  onSelectedWalletsChange?: Dispatch<SetStateAction<WalletPickerValue>>;
}

export const WalletPicker = ({
  wallets,
  selectedWallets,
  onSelectedWalletsChange,
}: WalletPickerProps) => {
  const [internalSelectedWallets, setInternalSelectedWallets] = useState<
    Set<number>
  >(selectedWallets ?? new Set());

  const updateState = onSelectedWalletsChange ?? setInternalSelectedWallets;

  const handleCheckedChange = (
    isChecked: boolean,
    walletId: WalletSchema['id'],
  ) => {
    updateState((prev) => {
      if (isChecked) prev.add(walletId);
      else prev.delete(walletId);

      return new Set([...prev]);
    });
  };

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
            checked={internalSelectedWallets.has(wallet.id)}
            onCheckedChange={(isChecked) =>
              handleCheckedChange(isChecked, wallet.id)
            }
          >
            {wallet.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

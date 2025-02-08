import { WalletsQueryRecord } from '@/database/wallets/wallets-query.ts';
import { UpdateWalletFormValue } from '@/data-management/wallets/data-mutation/forms/form-schemas/update-wallet-form-schema.ts';
import { DefaultValues } from 'react-hook-form';
import { DeleteWalletMutationVariables } from '@/database/wallets/delete-mutation.ts';

export const toFormValue = (
  wallet: WalletsQueryRecord,
): DefaultValues<UpdateWalletFormValue> => ({
  name: wallet.name,
});

export const toDeleteMutationVariables = (
  wallet: WalletsQueryRecord,
): DeleteWalletMutationVariables => wallet.id;

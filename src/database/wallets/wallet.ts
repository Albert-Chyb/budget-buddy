import { Tables, TablesInsert, TablesUpdate } from '@/database/types.ts';

export type WalletNonUpdatableFields = 'balance';

export type WalletAutoDeriveFields = 'owner_id' | 'id';

export type Wallet = Tables<'wallets'>;

export type WalletInsert = TablesInsert<'wallets'>;

export type WalletUpdate = Omit<
  TablesUpdate<'wallets'>,
  WalletNonUpdatableFields
>;

export type WalletInsertInput = Omit<WalletInsert, WalletAutoDeriveFields>;

export type WalletUpdateInput = Omit<WalletUpdate, WalletAutoDeriveFields>;

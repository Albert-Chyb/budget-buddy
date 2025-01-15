import { Tables, TablesInsert, TablesUpdate } from '@/database/types.ts';

export type WalletAutoDeriveFields = 'owner_id' | 'id';

export type Wallet = Tables<'wallets'>;

export type WalletInsert = TablesInsert<'wallets'>;

export type WalletUpdate = TablesUpdate<'wallets'>;

export type WalletInsertInput = Omit<WalletInsert, WalletAutoDeriveFields>;

export type WalletUpdateInput = Omit<WalletUpdate, WalletAutoDeriveFields>;

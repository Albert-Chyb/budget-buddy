import { Tables, TablesInsert, TablesUpdate } from '@/database/types.ts';

export type TransactionAutoDeriveFields = 'created_at' | 'owner_id' | 'id';

export type Transaction = Tables<'transactions'>;

export type TransactionInsert = TablesInsert<'transactions'>;

export type TransactionUpdate = TablesUpdate<'transactions'>;

export type TransactionInsertInput = Omit<
  TransactionInsert,
  TransactionAutoDeriveFields
>;

export type TransactionUpdateInput = Omit<
  TransactionUpdate,
  TransactionAutoDeriveFields
>;

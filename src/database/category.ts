import { Tables, TablesInsert, TablesUpdate } from '@/database/types.ts';

/**
 * Fields of which values do not have to be gathered directly from the user.
 * */
export type CategoryAutoDeriveFields = 'id' | 'owner_id';

export type Category = Tables<'categories'>;

export type CategoryInsert = TablesInsert<'categories'>;

export type CategoryUpdate = TablesUpdate<'categories'>;

export type CategoryUpdateInput = Omit<
  CategoryUpdate,
  CategoryAutoDeriveFields
>;

export type CategoryInsertInput = Omit<
  CategoryInsert,
  CategoryAutoDeriveFields
>;

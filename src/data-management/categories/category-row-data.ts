import { CategoriesQueryRow } from '@/database/categories/categories-query.ts';
import { DefaultValues } from 'react-hook-form';
import { CategoryDeleteMutationVariables } from '@/database/categories/delete-mutation.ts';
import { CategoryFormValue } from '@/data-management/categories/data-mutation/forms/form-schemas/category-form-schema.ts';

export const toFormValue = (
  rowData: CategoriesQueryRow,
): DefaultValues<CategoryFormValue> => ({
  color_id: rowData.color?.id ?? null,
  name: rowData.name,
  type_id: rowData.type.id,
});

export const toDeleteMutationVariables = (
  rowData: CategoriesQueryRow,
): CategoryDeleteMutationVariables => rowData.id;

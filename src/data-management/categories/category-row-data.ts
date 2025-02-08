import { CategoriesQueryRow } from '@/database/categories/categories-query.ts';
import { DefaultValues } from 'react-hook-form';
import { UpdateCategoryFormValue } from '@/data-management/categories/data-mutation/forms/form-schemas/update-category-form-schema.ts';
import { CategoryDeleteMutationVariables } from '@/database/categories/delete-mutation.ts';

export const toFormValue = (
  rowData: CategoriesQueryRow,
): DefaultValues<UpdateCategoryFormValue> => ({
  color_id: rowData.color?.id ?? null,
  name: rowData.name,
  type_id: rowData.type.id,
});

export const toDeleteMutationVariables = (
  rowData: CategoriesQueryRow,
): CategoryDeleteMutationVariables => rowData.id;

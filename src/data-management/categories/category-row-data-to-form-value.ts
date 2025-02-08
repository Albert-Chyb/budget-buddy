import { CategoriesQueryRow } from '@/database/categories/categories-query.ts';
import { DefaultValues } from 'react-hook-form';
import { CreateCategoryFormValue } from '@/data-management/categories/data-mutation/forms/form-schemas/create-category-form-schema.ts';

export const categoryRowDataToFormValue = (
  rowData: CategoriesQueryRow,
): DefaultValues<CreateCategoryFormValue> => ({
  color_id: rowData.color?.id ?? null,
  name: rowData.name,
  type_id: rowData.type.id,
});

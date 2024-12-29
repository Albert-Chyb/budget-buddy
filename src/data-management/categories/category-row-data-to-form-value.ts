import { CategoryRowData } from '@/data-management/categories/categories-table-data-query.ts';
import { CategoryFormValue } from '@/data-management/categories/data-mutation/category-form-schema.ts';

export const categoryRowDataToFormValue = (
  rowData: CategoryRowData,
): CategoryFormValue => ({
  color_id: rowData.color?.id ?? '',
  name: rowData.name,
  type_id: rowData.type.id,
});

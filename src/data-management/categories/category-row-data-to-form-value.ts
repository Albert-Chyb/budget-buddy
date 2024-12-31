import { CategoryRowData } from '@/data-management/categories/categories-table-data-query.ts';
import { Tables } from '@/database/types.ts';

export const categoryRowDataToFormValue = (
  rowData: CategoryRowData,
): Tables<'categories'> => ({
  color_id: rowData.color?.id ?? null,
  id: rowData.id,
  name: rowData.name,
  owner_id: rowData.owner_id,
  parent_category_id: rowData.parent_category_id,
  type_id: rowData.type.id,
});

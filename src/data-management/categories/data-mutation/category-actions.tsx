import { CategoryColor } from '@/data-management/categories/category-colors-query.ts';
import { CategoryType } from '@/data-management/categories/category-types-query.ts';
import { CategoryRowData } from '@/data-management/categories/categories-table-data-query.ts';
import { CategoryUpdateButton } from '@/data-management/categories/data-mutation/actions/category-update-button.tsx';
import { CategoryDeleteButton } from '@/data-management/categories/data-mutation/actions/category-delete-button.tsx';

export interface CategoryActionsProps {
  category: CategoryRowData;
  categoryTypes: CategoryType[];
  categoryColors: CategoryColor[];
}

export function CategoryActions(props: CategoryActionsProps) {
  const { category, categoryTypes, categoryColors } = props;

  return (
    <>
      <CategoryUpdateButton
        categoryColors={categoryColors}
        categoryTypes={categoryTypes}
        category={category}
      />

      <CategoryDeleteButton id={category.id} />
    </>
  );
}

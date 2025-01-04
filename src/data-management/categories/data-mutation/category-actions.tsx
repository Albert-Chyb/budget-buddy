import { CategoryColor } from '@/database/category-colors/query.ts';
import { CategoryType } from '@/database/category-types/query.ts';
import { CategoryRowData } from '@/database/categories/table-data-query.ts';
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

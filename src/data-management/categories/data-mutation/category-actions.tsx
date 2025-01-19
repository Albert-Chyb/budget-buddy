import { CategoryColor } from '@/database/category-colors/query.ts';
import { CategoryType } from '@/database/category-types/query.ts';
import { CategoriesQueryRow } from '@/database/categories/categories-query.ts';
import { CategoryUpdateButton } from '@/data-management/categories/data-mutation/actions/category-update-button.tsx';
import { CategoryDeleteButton } from '@/data-management/categories/data-mutation/actions/category-delete-button.tsx';
import { RowActions } from '@/data-management/data-mutation/row-actions.tsx';

export interface CategoryActionsProps {
  category: CategoriesQueryRow;
  categoryTypes: CategoryType[];
  categoryColors: CategoryColor[];
}

export function CategoryActions(props: CategoryActionsProps) {
  const { category, categoryTypes, categoryColors } = props;

  return (
    <RowActions>
      <CategoryUpdateButton
        categoryColors={categoryColors}
        categoryTypes={categoryTypes}
        category={category}
      />

      <CategoryDeleteButton id={category.id} />
    </RowActions>
  );
}

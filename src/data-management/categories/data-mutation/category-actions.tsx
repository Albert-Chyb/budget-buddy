import { CategoryColor } from '@/database/category-colors/query.ts';
import { CategoryTypesQueryRow } from '@/database/category-types/query.ts';
import { CategoriesQueryRow } from '@/database/categories/categories-query.ts';
import { CategoryUpdateAction } from '@/data-management/categories/data-mutation/actions/category-update-action.tsx';
import { CategoryDeleteButton } from '@/data-management/categories/data-mutation/actions/category-delete-action.tsx';
import { RowActions } from '@/data-management/common/data-mutation/row-actions.tsx';

export interface CategoryActionsProps {
  category: CategoriesQueryRow;
  categoryTypes: CategoryTypesQueryRow[];
  categoryColors: CategoryColor[];
}

export function CategoryActions(props: CategoryActionsProps) {
  const { category, categoryTypes, categoryColors } = props;

  return (
    <RowActions>
      <CategoryUpdateAction
        categoryColors={categoryColors}
        categoryTypes={categoryTypes}
        category={category}
      />

      <CategoryDeleteButton id={category.id} />
    </RowActions>
  );
}

import { useCategoryUpdateMutation } from '@/data-management/categories/update-category-mutation.ts';
import { UpdateCategoryFormValue } from '@/data-management/categories/data-mutation/update-category-form-schema.ts';
import { CategoryEditor } from '@/data-management/categories/data-mutation/category-editor.tsx';
import { categoryRowDataToFormValue } from '@/data-management/categories/category-row-data-to-form-value.ts';
import { CategoryColor } from '@/data-management/categories/category-colors-query.ts';
import { CategoryType } from '@/data-management/categories/category-types-query.ts';
import { CategoryRowData } from '@/data-management/categories/categories-table-data-query.ts';
import { useEditorContext } from '@/data-management/data-mutation/editor-open-state.tsx';

interface CategoryUpdateButtonProps {
  categoryColors: CategoryColor[];
  categoryTypes: CategoryType[];
  category: CategoryRowData;
}

export const CategoryUpdateButton = (props: CategoryUpdateButtonProps) => {
  const { categoryColors, categoryTypes, category } = props;
  const { closeEditor } = useEditorContext();
  const { mutate, isPending } = useCategoryUpdateMutation();

  function handleSubmit(formValue: UpdateCategoryFormValue) {
    mutate(
      { id: category.id, category: formValue },
      {
        onSuccess: () => closeEditor(),
      },
    );
  }

  return (
    <CategoryEditor
      id={String(category.id)}
      category={categoryRowDataToFormValue(category)}
      onSubmit={handleSubmit}
      categoryTypes={categoryTypes}
      categoryColors={categoryColors}
      isPending={isPending}
    />
  );
};

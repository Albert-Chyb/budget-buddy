import { CategoryType } from '@/data-management/categories/category-types-query.ts';
import { CategoryColor } from '@/data-management/categories/category-colors-query.ts';
import { useCreateCategoryMutation } from '@/data-management/categories/create-category-mutation.ts';
import { useEditorContext } from '@/data-management/data-mutation/editor-open-state.tsx';
import { CreateCategoryFormValue } from '@/data-management/categories/data-mutation/create-category-form-schema.ts';
import { CategoryCreator } from '@/data-management/categories/data-mutation/category-creator.tsx';

interface CategoryCreateButtonProps {
  categoryTypes: CategoryType[];
  categoryColors: CategoryColor[];
}

export function CategoryCreateButton(props: CategoryCreateButtonProps) {
  const { categoryColors, categoryTypes } = props;
  const { mutate: createCategory, isPending: isCreatePending } =
    useCreateCategoryMutation();
  const { closeEditor } = useEditorContext();

  function handleSubmit(formValue: CreateCategoryFormValue) {
    createCategory(formValue, {
      onSuccess: () => {
        closeEditor();
      },
    });
  }

  return (
    <CategoryCreator
      id='category-creator'
      onSubmit={handleSubmit}
      categoryTypes={categoryTypes}
      categoryColors={categoryColors}
      isPending={isCreatePending}
    />
  );
}

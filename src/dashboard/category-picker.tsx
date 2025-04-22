import { Button } from '@/components/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu';
import { CategoriesListQueryData } from '@/database/categories/categories-list-query';
import { useMultipleSelection } from '@/helpers/multiple-selection';
import { NotebookTabs } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

export type CategoryPickerValue = Set<number>;

export interface CategoryPickerProps {
  categories: CategoriesListQueryData;
  onSelectedCategoriesChange: Dispatch<SetStateAction<CategoryPickerValue>>;
  selectedCategories: CategoryPickerValue;
}

export const CategoryPicker = ({
  categories,
  onSelectedCategoriesChange,
  selectedCategories,
}: CategoryPickerProps) => {
  const { isChecked, handleCheckedChange } = useMultipleSelection(
    selectedCategories,
    onSelectedCategoriesChange,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-testid='category-picker-dropdown'>
          <NotebookTabs /> Kategoria
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Wybierz kategorie</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {categories.map((category) => (
          <DropdownMenuCheckboxItem
            key={category.id}
            onSelect={($event) => $event.preventDefault()}
            checked={isChecked(category.id)}
            onCheckedChange={(isChecked) =>
              handleCheckedChange(isChecked, category.id)
            }
          >
            {category.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

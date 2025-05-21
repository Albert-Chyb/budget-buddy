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
import { NotebookTabs } from 'lucide-react';

export type CategoryPickerValue = Set<number>;
export type CategoryPickerUpdater = (
  prev: CategoryPickerValue,
) => CategoryPickerValue;

export interface CategoryPickerProps {
  categories: CategoriesListQueryData;
  onSelectedCategoriesChange: (updater: CategoryPickerUpdater) => void;
  selectedCategories: CategoryPickerValue;
}

export const CategoryPicker = ({
  categories,
  onSelectedCategoriesChange,
  selectedCategories,
}: CategoryPickerProps) => {
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
            checked={selectedCategories.has(category.id)}
            onCheckedChange={(isChecked) =>
              onSelectedCategoriesChange((prev) => {
                const copy = new Set(prev);
                if (isChecked) copy.add(category.id);
                else copy.delete(category.id);

                return copy;
              })
            }
          >
            {category.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

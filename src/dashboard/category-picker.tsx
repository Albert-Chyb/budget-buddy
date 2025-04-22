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
import { Dispatch, SetStateAction, useState } from 'react';

export type CategoryPickerValue = Set<number>;

export interface CategoryPickerProps {
  categories: CategoriesListQueryData;
  onSelectedCategoriesChange?: Dispatch<SetStateAction<CategoryPickerValue>>;
  selectedCategories?: CategoryPickerValue;
}

export const CategoryPicker = ({
  categories,
  onSelectedCategoriesChange,
  selectedCategories,
}: CategoryPickerProps) => {
  const [values, setValues] = useState(new Set<number>());

  const selectedState = selectedCategories ?? values;
  const setSelectedState = onSelectedCategoriesChange ?? setValues;

  const handleCheckedChange = (isChecked: boolean, id: number) => {
    setSelectedState((prev) => {
      if (isChecked) prev.add(id);
      else prev.delete(id);

      return new Set([...prev]);
    });
  };

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
            checked={selectedState.has(category.id)}
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

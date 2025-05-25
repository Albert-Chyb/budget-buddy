import { Button } from '@/components/button';
import {
  ResponsiveMultiSelect,
  ResponsiveMultiSelectProps,
} from '@/components/responsive-multi-select';
import { CategoriesListQueryData } from '@/database/categories/categories-list-query';
import { NotebookTabs } from 'lucide-react';

export interface CategoryPickerProps
  extends Pick<
    ResponsiveMultiSelectProps<number>,
    'selection' | 'onSelectionChange' | 'isMobile'
  > {
  categories: CategoriesListQueryData;
}

export const CategoryPicker = ({
  categories,
  ...rest
}: CategoryPickerProps) => {
  return (
    <ResponsiveMultiSelect
      title='Wybierz kategorie'
      description='Wybierz kategorie, dla których chcesz wyświetlić statystyki transakcji'
      options={categories.map((category) => ({
        value: category.id,
        label: category.name,
      }))}
      {...rest}
    >
      <Button>
        <NotebookTabs /> Kategoria
      </Button>
    </ResponsiveMultiSelect>
  );
};

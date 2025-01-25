import { FieldValues, Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select.tsx';
import { recordIdValueAdapter } from '@/helpers/input-value-adapter.ts';
import { CategoriesListQueryData } from '@/database/categories/categories-list-query.ts';

export interface CategoryFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  categories: CategoriesListQueryData;
}

export const CategoryFormField = <T extends FieldValues>({
  categories,
  name,
}: CategoryFormFieldProps<T>) => {
  const form = useFormContext();
  const { fromInputValue, toInputValue } = recordIdValueAdapter;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, onChange, ...otherFieldProps } }) => (
        <FormItem>
          <FormLabel>Kategoria</FormLabel>
          <FormControl>
            <Select
              value={toInputValue(value)}
              onValueChange={(value) => onChange(fromInputValue(value))}
            >
              <SelectTrigger {...otherFieldProps}>
                <SelectValue placeholder='Wybierz kategorię' />
              </SelectTrigger>

              <SelectContent>
                {categories.map(({ id, name }) => (
                  <SelectItem
                    key={id}
                    value={toInputValue(id)}
                  >
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

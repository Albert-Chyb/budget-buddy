import { FieldValues, Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form.tsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group.tsx';

import { CategoryTypesQueryRow } from '@/database/category-types/query.ts';
import { recordIdValueAdapter } from '@/helpers/input-value-adapter.ts';

interface CategoryTypeFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  categoryTypes: CategoryTypesQueryRow[];
}

export const CategoryTypeFormField = <T extends FieldValues>(
  props: CategoryTypeFormFieldProps<T>,
) => {
  const { name, categoryTypes } = props;
  const form = useFormContext<T>();
  const { fromInputValue, toInputValue } = recordIdValueAdapter;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Typ kategorii</FormLabel>
          <FormControl>
            <ToggleGroup
              {...field}
              data-testid='category-type-toggle'
              value={toInputValue(field.value)}
              onValueChange={(value) => field.onChange(fromInputValue(value))}
              type='single'
              variant='outline'
            >
              {categoryTypes.map((type) => {
                return (
                  <ToggleGroupItem
                    data-testid={`category-type-toggle-option-${type.id}`}
                    key={type.id}
                    className='basis-full'
                    value={toInputValue(type.id)}
                  >
                    {type.name}
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </FormControl>
          <FormDescription>
            To ustawienie określa, czy transakcje w tej kategorii to wydatek czy
            przychód.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

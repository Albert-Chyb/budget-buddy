import { FieldValues, Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form.tsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group.tsx';

import { CategoryType } from '@/database/category-types/query.ts';
import { recordIdValueAdapter } from '@/helpers/input-value-adapter.ts';

interface CategoryTypeFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  categoryTypes: CategoryType[];
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
              value={toInputValue(field.value)}
              onValueChange={(value) => field.onChange(fromInputValue(value))}
              type='single'
              variant='outline'
            >
              {categoryTypes.map((type) => {
                return (
                  <ToggleGroupItem
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

import { FieldValues, Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form.tsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group.tsx';

import { CategoryType } from '@/database/category-type-schema.ts';

interface CategoryTypeFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  categoryTypes: CategoryType[];
}

export const CategoryTypeFormField = <T extends FieldValues>(
  props: CategoryTypeFormFieldProps<T>,
) => {
  const { name, categoryTypes } = props;
  const form = useFormContext<T>();

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
              onValueChange={field.onChange}
              type='single'
              variant='outline'
            >
              {categoryTypes.map((type) => {
                return (
                  <ToggleGroupItem
                    key={type.id}
                    className='basis-full'
                    value={type.id}
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

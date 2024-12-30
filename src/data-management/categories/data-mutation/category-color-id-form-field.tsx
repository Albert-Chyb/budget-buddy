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

import { CategoryColor } from '@/data-management/categories/category-colors-query.ts';

interface CategoryColorIdFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  categoryColors: CategoryColor[];
}

export const CategoryColorIdFormField = <T extends FieldValues>(
  props: CategoryColorIdFormFieldProps<T>,
) => {
  const { name, categoryColors } = props;
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Kolor</FormLabel>
          <FormControl>
            <Select
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
              disabled={field.disabled}
            >
              <SelectTrigger
                ref={field.ref}
                onBlur={field.onBlur}
              >
                <SelectValue placeholder='Wybierz kolor' />
              </SelectTrigger>
              <SelectContent>
                {categoryColors.map((color) => (
                  <SelectItem
                    key={color.id}
                    value={color.id}
                  >
                    {color.name}
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

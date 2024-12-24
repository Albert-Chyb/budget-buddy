import { FieldValues, Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form.tsx';
import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group.tsx';
import { categoryTypeSchema } from '@/data-management/categories/category-form-schema.ts';
import { categoryTypeLabels } from '@/data-management/categories/category-type-labels.ts';

const CATEGORY_TYPE_OPTIONS = categoryTypeSchema.options.map((option) => (
  <ToggleGroupItem
    key={option}
    className='basis-full'
    value={option}
  >
    {categoryTypeLabels[option]}
  </ToggleGroupItem>
));

interface CategoryTypeFormFieldProps<T extends FieldValues> {
  name: Path<T>;
}

export const CategoryTypeFormField = <T extends FieldValues>(
  props: CategoryTypeFormFieldProps<T>,
) => {
  const { name } = props;
  const form = useFormContext();

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
              {CATEGORY_TYPE_OPTIONS}
            </ToggleGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

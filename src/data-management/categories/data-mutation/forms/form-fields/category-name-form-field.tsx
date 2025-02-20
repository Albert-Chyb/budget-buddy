import { FieldValues, Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form.tsx';
import { Input } from '@/components/input.tsx';

interface CategoryNameFormFieldProps<T extends FieldValues> {
  name: Path<T>;
}

export const CategoryNameFormField = <T extends FieldValues>(
  props: CategoryNameFormFieldProps<T>,
) => {
  const { name } = props;
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nazwa kategorii</FormLabel>
          <FormControl>
            <Input
              data-testid='category-name-input'
              placeholder='np.: Zakupy'
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

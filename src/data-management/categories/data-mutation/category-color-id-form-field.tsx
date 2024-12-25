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

interface CategoryColorIdFormFieldProps<T extends FieldValues> {
  name: Path<T>;
}

export const CategoryColorIdFormField = <T extends FieldValues>(
  props: CategoryColorIdFormFieldProps<T>,
) => {
  const { name } = props;
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
                <SelectItem value='1'>Pomarańczowy</SelectItem>
                <SelectItem value='2'>Czerwony</SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

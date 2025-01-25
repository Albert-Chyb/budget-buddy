import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form.tsx';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { Textarea } from '@/components/textarea.tsx';

export interface DescriptionFormFieldProps<T extends FieldValues> {
  name: Path<T>;
}

export const DescriptionFormField = <T extends FieldValues>({
  name,
}: DescriptionFormFieldProps<T>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Opis</FormLabel>
          <FormControl>
            <Textarea
              placeholder='Dodaj opis do tej transakcji'
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

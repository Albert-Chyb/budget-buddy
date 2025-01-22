import { Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form.tsx';
import { Input } from '@/components/input.tsx';
import { ReactNode } from 'react';

export interface CurrencyFormFieldProps<T> {
  label: ReactNode;
  description?: ReactNode;
  name: Path<T>;
}

export const CurrencyFormField = <T,>({
  name,
  label,
  description,
}: CurrencyFormFieldProps<T>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type='number'
              step='any'
              placeholder='np: 1000,00'
              {...field}
            />
          </FormControl>
          <FormMessage />
          {description && <FormDescription>{description}</FormDescription>}
        </FormItem>
      )}
    />
  );
};

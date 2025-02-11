import { Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form.tsx';
import { ReactNode } from 'react';
import { CurrencyInput } from '@/components/currency-input.tsx';

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
      render={({ field: { value, onChange, ...fieldProps } }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <CurrencyInput
                value={value}
                onValueChange={onChange}
                {...fieldProps}
              />
            </FormControl>
            <FormMessage />
            {description && <FormDescription>{description}</FormDescription>}
          </FormItem>
        );
      }}
    />
  );
};

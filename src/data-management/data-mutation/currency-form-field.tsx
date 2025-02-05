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
import { Currency } from '@/helpers/currency.ts';

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
        const currency = value ?? new Currency(0);

        if (!Currency.isCurrency(currency)) {
          throw new Error(
            'The currency form field expects a value that is an instance of the Currency class',
          );
        }

        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                type='number'
                step='any'
                placeholder='np: 1000,00'
                value={currency.toDecimal()}
                onChange={($event) =>
                  onChange(Currency.fromDecimal(+$event.target.value))
                }
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

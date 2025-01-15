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

export interface WalletBalanceFormFieldProps<T> {
  name: Path<T>;
}

export const WalletBalanceFormField = <T,>({
  name,
}: WalletBalanceFormFieldProps<T>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Początkowy balans</FormLabel>
          <FormControl>
            <Input
              type='number'
              step='any'
              placeholder='np: 1000,00'
              {...field}
            />
          </FormControl>
          <FormMessage />
          <FormDescription>Tego pola nie można później zmienić</FormDescription>
        </FormItem>
      )}
    />
  );
};

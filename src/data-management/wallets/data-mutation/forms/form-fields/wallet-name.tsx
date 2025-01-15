import { Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form.tsx';
import { Input } from '@/components/input.tsx';

interface WalletNameFormFieldProps<T> {
  name: Path<T>;
}

export const WalletNameFormField = <T,>({
  name,
}: WalletNameFormFieldProps<T>) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Nazwa portfela</FormLabel>
          <FormControl>
            <Input
              placeholder='np.: Oszczędności'
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

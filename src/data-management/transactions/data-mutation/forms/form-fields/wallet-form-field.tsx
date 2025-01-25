import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { recordIdValueAdapter } from '@/helpers/input-value-adapter.ts';
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
import { WalletsListQueryData } from '@/database/wallets/wallets-list-query.ts';

export interface WalletFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  wallets: WalletsListQueryData;
}

export const WalletFormField = <T extends FieldValues>({
  wallets,
  name,
}: WalletFormFieldProps<T>) => {
  const form = useFormContext();
  const { fromInputValue, toInputValue } = recordIdValueAdapter;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field: { value, onChange, ...otherFieldProps } }) => (
        <FormItem>
          <FormLabel>Portfel</FormLabel>
          <FormControl>
            <Select
              value={toInputValue(value)}
              onValueChange={(value) => onChange(fromInputValue(value))}
            >
              <SelectTrigger {...otherFieldProps}>
                <SelectValue placeholder='Wybierz portfel' />
              </SelectTrigger>
              <SelectContent>
                {wallets.map(({ id, name }) => (
                  <SelectItem
                    key={id}
                    value={toInputValue(id)}
                  >
                    {name}
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

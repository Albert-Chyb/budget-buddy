import { FieldValues, Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form.tsx';
import { Input } from '@/components/input.tsx';

interface PasswordFormFieldProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
}

export function PasswordFormField<TFieldValues extends FieldValues>(
  props: PasswordFormFieldProps<TFieldValues>,
) {
  const { name } = props;
  const { control } = useFormContext<TFieldValues>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Hasło</FormLabel>
          <FormControl>
            <Input
              type='password'
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

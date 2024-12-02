import { FieldValues, Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form.tsx';
import { Input } from '@/components/input.tsx';
import { ComponentProps } from 'react';

interface PasswordFormFieldProps<TFieldValues extends FieldValues>
  extends ComponentProps<'input'> {
  name: Path<TFieldValues>;
}

export function PasswordFormField<TFieldValues extends FieldValues>(
  props: PasswordFormFieldProps<TFieldValues>,
) {
  const { name, ...otherProps } = props;
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
              {...otherProps}
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

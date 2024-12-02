import { FieldValues, Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form.tsx';
import { Input } from '@/components/input.tsx';
import { ComponentProps, ReactNode } from 'react';

interface PasswordFormFieldProps<TFieldValues extends FieldValues>
  extends ComponentProps<'input'> {
  name: Path<TFieldValues>;
  label?: ReactNode;
}

export function PasswordFormField<TFieldValues extends FieldValues>(
  props: PasswordFormFieldProps<TFieldValues>,
) {
  const { name, label = 'Hasło', ...otherProps } = props;
  const { control } = useFormContext<TFieldValues>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
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

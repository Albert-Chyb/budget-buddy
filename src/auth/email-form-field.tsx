import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form';
import { Input } from '@/components/input';
import { FieldValues, Path, useFormContext } from 'react-hook-form';
import { ComponentProps } from 'react';

interface EmailFormFieldProps<TFieldValues extends FieldValues>
  extends ComponentProps<'input'> {
  name: Path<TFieldValues>;
}

export function EmailFormField<TFieldValues extends FieldValues>(
  props: EmailFormFieldProps<TFieldValues>,
) {
  const { name, ...otherProps } = props;
  const { control } = useFormContext<TFieldValues>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input
              placeholder='np.: jan.kowalski@wp.pl'
              {...otherProps}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

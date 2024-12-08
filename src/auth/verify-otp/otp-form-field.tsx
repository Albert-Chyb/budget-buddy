import { FieldValues, Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form.tsx';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/otp-input.tsx';

export interface OTPFormFieldProps<T extends FieldValues> {
  name: Path<T>;
}

export function OTPFormField<T extends FieldValues>(
  props: OTPFormFieldProps<T>,
) {
  const { name } = props;
  const { control } = useFormContext<T>();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Kod pin</FormLabel>
          <FormControl>
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              {...field}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </FormControl>
          <FormDescription>Wpisz kod z wiadomości email</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

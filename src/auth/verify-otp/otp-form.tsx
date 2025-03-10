import { FieldErrors, useForm } from 'react-hook-form';
import {
  OTPFormSchema,
  OTPFormValue,
} from '@/auth/verify-otp/otp-form-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/form.tsx';
import { OTPFormField } from '@/auth/verify-otp/otp-form-field.tsx';
import { ForwardedRef, forwardRef } from 'react';

export type OTPFormErrors = FieldErrors<OTPFormValue>;

export interface OPTFormProps {
  onSubmit: (formValue: OTPFormValue) => void;
  id: string;
  errors?: OTPFormErrors;
}

export const OTPForm = forwardRef(
  (props: OPTFormProps, forwardedRef: ForwardedRef<HTMLFormElement>) => {
    const { onSubmit, id, errors } = props;
    const form = useForm<OTPFormValue>({
      resolver: zodResolver(OTPFormSchema),
      defaultValues: {
        otp: '',
      },
      errors,
    });

    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          ref={forwardedRef}
          id={id}
        >
          <OTPFormField<OTPFormValue> name='otp' />
        </form>
      </Form>
    );
  },
);

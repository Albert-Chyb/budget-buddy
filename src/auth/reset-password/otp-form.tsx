import { useForm } from 'react-hook-form';
import {
  OTPFormSchema,
  OTPFormValue,
} from '@/auth/reset-password/otp-form-schema.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/form.tsx';
import { OTPFormField } from '@/auth/reset-password/otp-form-field.tsx';
import { ForwardedRef, forwardRef } from 'react';

interface OPTFormProps {
  onSubmit: (formValue: OTPFormValue) => void;
  id: string;
}

export const OTPForm = forwardRef(
  (props: OPTFormProps, forwardedRef: ForwardedRef<HTMLFormElement>) => {
    const { onSubmit, id } = props;
    const form = useForm<OTPFormValue>({
      resolver: zodResolver(OTPFormSchema),
      defaultValues: {
        otp: '',
      },
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

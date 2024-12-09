import { isAuthApiError } from '@supabase/supabase-js';
import { authErrorToFormFieldError } from '@/auth/auth-error-to-form-field-error.ts';
import { OTPFormErrors } from '@/auth/verify-otp/otp-form.tsx';

export function convertOtpErrorToFormError(
  error: unknown,
): OTPFormErrors | undefined {
  if (!isAuthApiError(error)) return;

  if (error.code === 'otp_expired')
    return {
      otp: authErrorToFormFieldError(error),
    };
}

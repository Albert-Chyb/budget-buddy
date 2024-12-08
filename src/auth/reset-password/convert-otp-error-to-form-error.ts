import { FieldErrors } from 'react-hook-form';
import { OTPFormValue } from '@/auth/reset-password/otp-form-schema.ts';
import { isAuthError } from '@supabase/supabase-js';

export function convertOtpErrorToFormError(
  error: unknown,
): FieldErrors<OTPFormValue> | undefined {
  if (isAuthError(error) && error.code === 'otp_expired')
    return {
      otp: {
        type: `server_${error.code}`,
        message: 'Kod stracił ważność lub jest niepoprawny',
      },
    };

  return;
}

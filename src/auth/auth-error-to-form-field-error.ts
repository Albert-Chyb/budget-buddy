import { AuthApiError } from '@supabase/supabase-js';
import { FieldError } from 'react-hook-form';

// Supabase does not export error codes
type ErrorCode = NonNullable<AuthApiError['code']>;

export const AUTH_ERRORS_MESSAGES = {
  otp_expired: 'Kod stracił ważność lub jest niepoprawny',
  user_already_exists: 'Użytkownik z podanym adresem email już istnieje',
  invalid_credentials: 'Hasło lub email jest niepoprawne',
  same_password: 'Nowe hasło musi różnić się od dotychczasowego',
} as const satisfies Record<ErrorCode, string>;

function messageExistsFor(
  code: string,
): code is keyof typeof AUTH_ERRORS_MESSAGES {
  return code in AUTH_ERRORS_MESSAGES;
}

export function authErrorToFormFieldError(
  apiError: AuthApiError,
): FieldError | undefined {
  if (!apiError.code) return;

  const { code, message } = apiError;
  const type = `server_${code}`;
  if (messageExistsFor(code))
    return {
      type,
      message: AUTH_ERRORS_MESSAGES[code],
    };
  else
    return {
      type,
      message,
    };
}

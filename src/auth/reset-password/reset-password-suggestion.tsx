import { Link } from '@tanstack/react-router';
import {
  AuthSuggestion,
  AuthSuggestionLink,
} from '@/auth/auth-suggestions.tsx';

export function ResetPasswordSuggestion() {
  return (
    <AuthSuggestion>
      Zapomniałeś hasła ?{' '}
      <AuthSuggestionLink>
        <Link to='/reset-password'>Zresetuj hasło</Link>
      </AuthSuggestionLink>
    </AuthSuggestion>
  );
}

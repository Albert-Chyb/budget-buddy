import { Link } from '@tanstack/react-router';
import {
  AuthSuggestion,
  AuthSuggestionLink,
} from '@/auth/auth-suggestions.tsx';

export function SignInSuggestion() {
  return (
    <AuthSuggestion>
      Masz już konto ?{' '}
      <AuthSuggestionLink>
        <Link
          to='/sign-in'
          className='typography-link'
        >
          Zaloguj się
        </Link>
      </AuthSuggestionLink>
    </AuthSuggestion>
  );
}

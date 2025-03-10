import { Link } from '@tanstack/react-router';
import {
  AuthSuggestion,
  AuthSuggestionLink,
} from '@/auth/auth-suggestions.tsx';

export function SignUpSuggestion() {
  return (
    <AuthSuggestion>
      Nie posiadasz jeszcze konta ?{' '}
      <AuthSuggestionLink>
        <Link
          to='/sign-up'
          className='typography-link'
        >
          Załóż konto
        </Link>
      </AuthSuggestionLink>
    </AuthSuggestion>
  );
}

import { Link } from '@tanstack/react-router';

export function SignInSuggestion() {
  return (
    <p className='typography-muted'>
      Masz już konto ?{' '}
      <Link
        to='/sign-in'
        className='typography-link'
      >
        Zaloguj się
      </Link>
    </p>
  );
}

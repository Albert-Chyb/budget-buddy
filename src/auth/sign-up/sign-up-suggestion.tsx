import { Link } from '@tanstack/react-router';

export function SignUpSuggestion() {
  return (
    <p className='typography-muted'>
      Nie posiadasz jeszcze konta ?{' '}
      <Link
        to='/sign-up'
        className='typography-link'
      >
        Załóż konto
      </Link>
    </p>
  );
}

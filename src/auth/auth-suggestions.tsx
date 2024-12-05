import { PropsWithChildren } from 'react';

function AuthSuggestions({ children }: PropsWithChildren) {
  return <ul className='text-center'>{children}</ul>;
}

function AuthSuggestion({ children }: PropsWithChildren) {
  return (
    <li>
      <p className='typography-muted'>{children}</p>
    </li>
  );
}

function AuthSuggestionLink({ children }: PropsWithChildren) {
  return <span className='typography-link'>{children}</span>;
}

export { AuthSuggestion, AuthSuggestionLink, AuthSuggestions };

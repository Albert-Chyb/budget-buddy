import * as React from 'react';
import { Outlet, createRootRoute, Link } from '@tanstack/react-router';
import { NotFound } from '@/routes/-not-found.tsx';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  return (
    <React.Fragment>
      <nav>
        <ul>
          <li>
            <Link to={'/'}>Strona główna</Link>
          </li>
          <li>
            <Link to={'/sign-up'}>Załóż konto</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </React.Fragment>
  );
}

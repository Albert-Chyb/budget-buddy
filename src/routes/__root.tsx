import { Outlet, createRootRoute, Link } from '@tanstack/react-router';
import { NotFound } from '@/routes/-not-found.tsx';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to='/'>Strona główna</Link>
          </li>
          <li>
            <Link to='/sign-up'>Załóż konto</Link>
          </li>
          <li>
            <Link to='/sign-in'>Zaloguj się</Link>
          </li>
          <li>
            <Link to='/reset-password'>Zresetuj hasło</Link>
          </li>
          <li>
            <Link to='/change-password'>Zmień hasło</Link>
          </li>
        </ul>
      </nav>

      <main className='container mx-auto'>
        <Outlet />
      </main>
    </>
  );
}

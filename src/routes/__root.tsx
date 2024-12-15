import { createRootRoute, Outlet } from '@tanstack/react-router';
import { NotFound } from '@/routes/-not-found.tsx';
import { MainNavigation } from '@/components/main-navigation.tsx';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  return (
    <>
      <MainNavigation />

      <main className='container mx-auto'>
        <Outlet />
      </main>
    </>
  );
}

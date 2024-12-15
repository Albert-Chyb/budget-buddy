import { createRootRoute, Outlet } from '@tanstack/react-router';
import { NotFound } from '@/routes/-not-found.tsx';
import { Banner } from '@/components/banner.tsx';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  return (
    <>
      <Banner />

      <main className='container mx-auto mt-14 md:mt-16 pt-2 px-2'>
        <Outlet />
      </main>
    </>
  );
}

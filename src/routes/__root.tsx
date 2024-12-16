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

      <main className='container mx-auto mt-[var(--banner-height)] pt-[var(--global-layout-space)] px-[var(--global-layout-space)]'>
        <Outlet />
      </main>
    </>
  );
}

import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from '@/route-tree.gen.ts';
import { lazy, Suspense } from 'react';

const router = createRouter({
  routeTree,
});

const DevTools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    )
  : () => null;

function ProvideTanStackRouter() {
  return (
    <>
      <RouterProvider router={router} />
      <Suspense>
        <DevTools router={router} />
      </Suspense>
    </>
  );
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export { ProvideTanStackRouter };

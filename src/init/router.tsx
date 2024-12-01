import { createRouter, RouterProvider } from '@tanstack/react-router';
import { routeTree } from '@/route-tree.gen.ts';

const router = createRouter({
  routeTree,
});

function ProvideTanStackRouter() {
  return <RouterProvider router={router} />;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export { ProvideTanStackRouter };

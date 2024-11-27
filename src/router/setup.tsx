import {
  createRouter,
  Link,
  NotFoundRoute,
  RouterProvider,
} from '@tanstack/react-router';
import { Route as rootRoute } from '@/routes/__root.tsx';
import { routeTree } from '@/route-tree.gen.ts';

const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: () => (
    <>
      <h1>Nie znaleziono strony !</h1>
      <Link to='/'>Wróć do strony głównej</Link>
    </>
  ),
});

const router = createRouter({
  routeTree,
  notFoundRoute,
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

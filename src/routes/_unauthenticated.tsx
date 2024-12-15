import { createFileRoute, retainSearchParams } from '@tanstack/react-router';
import {
  isUnauthenticated,
  useAuthRouteGuard,
} from '@/helpers/auth-route-guard.tsx';
import { zodValidator } from '@tanstack/zod-adapter';
import {
  DENIED_ROUTE_SEARCH_KEY,
  searchWithDeniedRoute,
  useDeniedRoute,
} from '@/helpers/restorable-route-guard-redirect.tsx';

export const Route = createFileRoute('/_unauthenticated')({
  component: RouteComponent,
  validateSearch: zodValidator(searchWithDeniedRoute),
  search: {
    middlewares: [retainSearchParams([DENIED_ROUTE_SEARCH_KEY])],
  },
});

function RouteComponent() {
  const redirect = useDeniedRoute('/');

  return useAuthRouteGuard(isUnauthenticated, redirect);
}

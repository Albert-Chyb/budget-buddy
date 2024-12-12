import { createFileRoute } from '@tanstack/react-router';
import {
  isUnauthenticated,
  useAuthRouteGuard,
} from '@/helpers/auth-route-guard.tsx';
import { zodValidator } from '@tanstack/zod-adapter';
import {
  searchWithDeniedRoute,
  useDeniedRoute,
} from '@/helpers/restorable-route-guard-redirect.tsx';

export const Route = createFileRoute('/_unauthenticated')({
  component: RouteComponent,
  validateSearch: zodValidator(searchWithDeniedRoute),
});

function RouteComponent() {
  const redirect = useDeniedRoute('/');

  return useAuthRouteGuard(isUnauthenticated, redirect);
}

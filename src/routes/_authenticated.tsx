import { createFileRoute, ToOptions } from '@tanstack/react-router';
import {
  isAuthenticated,
  useAuthRouteGuard,
} from '@/helpers/auth-route-guard.tsx';
import { useRestorableRedirect } from '@/helpers/restorable-route-guard-redirect.tsx';

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
});

const NON_RESTORABLE_ROUTES: ToOptions['to'][] = ['/sign-out'] as const;

function RouteComponent() {
  const redirect = useRestorableRedirect(
    { to: '/sign-in' },
    NON_RESTORABLE_ROUTES,
  );

  return useAuthRouteGuard(isAuthenticated, redirect);
}

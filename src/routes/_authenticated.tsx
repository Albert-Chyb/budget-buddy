import { createFileRoute, Navigate } from '@tanstack/react-router';
import {
  isAuthenticated,
  useAuthRouteGuard,
} from '@/helpers/auth-route-guard.tsx';

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
});

function RouteComponent() {
  return useAuthRouteGuard(isAuthenticated, <Navigate to='/sign-in' />);
}

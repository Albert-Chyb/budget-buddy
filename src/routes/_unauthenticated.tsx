import { createFileRoute, Navigate } from '@tanstack/react-router';
import {
  isUnauthenticated,
  useAuthRouteGuard,
} from '@/helpers/auth-route-guard.tsx';

export const Route = createFileRoute('/_unauthenticated')({
  component: RouteComponent,
});

function RouteComponent() {
  return useAuthRouteGuard(isUnauthenticated, <Navigate to='/' />);
}

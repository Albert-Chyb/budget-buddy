import { useUserQuery } from '@/auth/user-query';
import {
  createFileRoute,
  linkOptions,
  Navigate,
  Outlet,
  useLocation,
  useMatchRoute,
} from '@tanstack/react-router';
import { DENIED_ROUTE_SEARCH_KEY } from './_unauthenticated';

const signOutRoute = linkOptions({
  to: '/sign-out',
});

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user, isPending } = useUserQuery();
  const location = useLocation();
  const isCurrentRoute = useMatchRoute();

  if (isPending) return;

  if (!user) {
    if (isCurrentRoute(signOutRoute)) return <Navigate to='/sign-in' />;

    return (
      <Navigate
        to='/sign-in'
        search={{
          [DENIED_ROUTE_SEARCH_KEY]: location.href,
        }}
      />
    );
  }

  return <Outlet />;
}

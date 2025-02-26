import { useUserQuery } from '@/auth/user-query';
import {
  createFileRoute,
  linkOptions,
  Navigate,
  Outlet,
  retainSearchParams,
} from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

export const DENIED_ROUTE_SEARCH_KEY = 'deniedRoute';

/**
 * Will be used when a page cannot be access and
 * there is no deniedRoute in the search params
 */
const DEFAULT_REDIRECT = linkOptions({
  to: '/',
});

const searchParamsSchema = z.object({
  [DENIED_ROUTE_SEARCH_KEY]: z.string().optional(),
});

export const Route = createFileRoute('/_unauthenticated')({
  component: RouteComponent,
  validateSearch: zodValidator(searchParamsSchema),
  search: {
    middlewares: [retainSearchParams([DENIED_ROUTE_SEARCH_KEY])],
  },
});

function RouteComponent() {
  const { data: user, isPending } = useUserQuery();
  const search = Route.useSearch();

  if (isPending) return;

  if (user) {
    const deniedRoute = search[DENIED_ROUTE_SEARCH_KEY];
    if (deniedRoute === undefined) return <Navigate {...DEFAULT_REDIRECT} />;
    return <Navigate to={search[DENIED_ROUTE_SEARCH_KEY]} />;
  }

  return <Outlet />;
}

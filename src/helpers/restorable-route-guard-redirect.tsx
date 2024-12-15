import {
  Navigate,
  ToOptions,
  useLocation,
  useMatchRoute,
  useSearch,
} from '@tanstack/react-router';
import { RouteGuardRedirectFn } from '@/helpers/auth-route-guard.tsx';
import { z } from 'zod';

export const DENIED_ROUTE_SEARCH_KEY = 'deniedRoute' as const;

/**
 * Merges a given search object with the existing search options from ToOptions.
 *
 * @param toOptions - The routing options containing search parameters.
 * @param search - The additional search parameters to merge.
 * @returns The merged search parameters.
 */
function mergeSearch(toOptions: ToOptions, search: Record<string, string>) {
  if (toOptions.search && typeof toOptions.search === 'object')
    return {
      ...toOptions.search,
      ...search,
    };

  return search;
}

/**
 * Checks if any of the specified routes match the current location, indicating a non-restorable routes.
 *
 * @param routes - An array of route destinations to check.
 * @returns A boolean indicating if current route is non-restorable.
 */
function useNonRestorableRoutes(routes: ToOptions['to'][]) {
  const matchRoute = useMatchRoute();

  return routes.some((to) => !!matchRoute({ to, fuzzy: true }));
}

/**
 * Creates a redirect function for a route guard, optionally preserving the denied route in search params.
 *
 * @param redirectOptions - Where to redirect the user if the route is inaccessible.
 * @param nonRestorableRoutes - An array of routes that should not preserve the denied route.
 * @returns A function to handle redirection based on route guard state.
 */
export function useRestorableRedirect(
  redirectOptions: ToOptions,
  nonRestorableRoutes: ToOptions['to'][],
): RouteGuardRedirectFn {
  const location = useLocation();
  const isNonRestorable = useNonRestorableRoutes(nonRestorableRoutes);

  return ({ lostAccess }) => {
    if (lostAccess || isNonRestorable) return <Navigate {...redirectOptions} />;

    return (
      <Navigate
        {...redirectOptions}
        search={mergeSearch(redirectOptions, {
          [DENIED_ROUTE_SEARCH_KEY]: location.href,
        })}
      />
    );
  };
}

/**
 * Describes the structure of search parameters of a route that redirects back to the denied route.
 */
export const searchWithDeniedRoute = z.object({
  [DENIED_ROUTE_SEARCH_KEY]: z.string().optional().catch(''),
});

/**
 * Redirects the user to a previously denied route if available, or to a default route otherwise.
 *
 * @param defaultRedirect - The default route to navigate to if no denied route is present.
 * @returns A navigation element for the target route.
 */
export function useDeniedRoute(
  defaultRedirect: ToOptions['to'],
): RouteGuardRedirectFn {
  const search = useSearch({ strict: false });
  const deniedRoute = search[DENIED_ROUTE_SEARCH_KEY];

  if (deniedRoute) return () => <Navigate to={deniedRoute} />;
  else return () => <Navigate to={defaultRedirect} />;
}

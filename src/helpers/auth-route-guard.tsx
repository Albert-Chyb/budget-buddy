import { useUserQuery } from '@/auth/user-query.ts';
import { User } from '@supabase/supabase-js';
import { ReactNode, useMemo } from 'react';
import { Outlet } from '@tanstack/react-router';

/**
 * A function type that determines whether a user can access a route based on their authentication state.
 * @callback CanAccessFn
 * @param {User | null} user - The current user or `null` if unauthenticated.
 * @returns {boolean} - `true` if the route can be accessed, `false` otherwise.
 */
export type CanAccessFn = (user: User | null) => boolean;

/**
 * A predefined access function that checks if a user is authenticated.
 * @type {CanAccessFn}
 */
export const isAuthenticated: CanAccessFn = (user) => !!user;

/**
 * A predefined access function that checks if a user is unauthenticated.
 * @type {CanAccessFn}
 */
export const isUnauthenticated: CanAccessFn = (user) => !user;

/**
 * A hook that determines whether a route can be accessed based on authentication state.
 * If access is not allowed, it renders a fallback component. If an error occurs, it renders the error message.
 *
 * @function useAuthRouteGuard
 * @param {CanAccessFn} canAccessFn - A function to determine if the route is accessible based on the user's state.
 * @param {ReactNode} accessDeniedComponent - A component to render if access is denied.
 * @returns {ReactNode} - Renders the `Outlet` component if access is allowed, the fallback component if access is denied,
 *                        or the error message if an error occurs.
 */
export function useAuthRouteGuard(
  canAccessFn: CanAccessFn,
  accessDeniedComponent: ReactNode,
): ReactNode {
  const { data: user, isPending, error } = useUserQuery();
  const canAccessRoute = useMemo(
    () => canAccessFn(user ?? null),
    [user, canAccessFn],
  );

  if (error) return <p>{error.message}</p>;

  if (isPending) return;

  if (canAccessRoute) return <Outlet />;

  return accessDeniedComponent;
}

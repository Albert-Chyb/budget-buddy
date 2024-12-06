import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router';
import { useUserQuery } from '@/auth/user-query.ts';

export const Route = createFileRoute('/_unauthenticated')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user, isPending, error } = useUserQuery();

  if (error) return <p>{error.message}</p>;

  if (isPending) return <></>;

  if (!user) return <Outlet />;

  return <Navigate to='/' />;
}

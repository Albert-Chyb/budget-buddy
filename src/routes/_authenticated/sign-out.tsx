import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated/sign-out')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/sign-out"!</div>;
}

import * as React from 'react';
import { Outlet, createRootRoute } from '@tanstack/react-router';
import { NotFound } from '@/routes/-not-found.tsx';

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => <NotFound />,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div>Hello "__root"!</div>
      <Outlet />
    </React.Fragment>
  );
}

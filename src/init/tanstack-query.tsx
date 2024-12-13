import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, PropsWithChildren, Suspense } from 'react';

const client = new QueryClient();

const DevTools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((res) => ({
        default: res.ReactQueryDevtools,
      })),
    )
  : () => null;

export function ProvideTanStackQuery({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={client}>
      {children}
      <Suspense>
        <DevTools />
      </Suspense>
    </QueryClientProvider>
  );
}

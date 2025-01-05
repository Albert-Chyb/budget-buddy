import { MutationStatus, UseQueryResult } from '@tanstack/react-query';

function someQueriesHaveError(queries: UseQueryResult[]) {
  return queries.some((query) => query.status === 'error');
}

function someQueriesArePending(queries: UseQueryResult[]) {
  return queries.some((query) => query.status === 'pending');
}

function getQueryError(queries: UseQueryResult[]) {
  const queryWithError = queries.find((q) => q.status === 'error');
  return queryWithError?.error ?? null;
}

export function determineQueriesStatus(queries: UseQueryResult[]) {
  let status: MutationStatus = 'success';
  let error: Error | null = null;

  if (someQueriesHaveError(queries)) {
    status = 'error';
    error = getQueryError(queries);
  }
  if (someQueriesArePending(queries)) status = 'pending';

  return [status, error] as const;
}

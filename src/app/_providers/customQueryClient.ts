import { QueryClient } from '@tanstack/react-query';

export const customQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Prevent automatic refetching when the window is focused
      refetchOnWindowFocus: true,
      refetchOnReconnect: 'always',
      refetchOnMount: 'always',
      // Set the stale time to a high value to prevent automatic invalidation
      // For example, this sets it to 24 hours
      staleTime: Infinity,
    },
  },
});

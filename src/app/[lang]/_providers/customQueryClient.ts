import { QueryClient } from "@tanstack/react-query";

export const customQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      refetchOnReconnect: "always",
      refetchOnMount: false,
      staleTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

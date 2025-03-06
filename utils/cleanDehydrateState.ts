import type { DehydratedState } from '@tanstack/react-query';

export function cleanDehydratedState(state: DehydratedState): DehydratedState {
  return {
    ...state,
    queries: state.queries.map((query) => ({
      ...query,
      state: {
        ...query.state,
        data: (query.state.data as any)?.data,
      },
    })),
  };
}

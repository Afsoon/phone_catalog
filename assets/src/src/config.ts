export const cacheConfig = {
  refetchOnWindowFocus: true,
  refetchOnReconnect: true,
  refetchOnMount: true,
  staleTime: 10000,
  keepPreviousData: true,
  retryDelay: (attempt: number) =>
    Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000),
}

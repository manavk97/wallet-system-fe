import { QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

export const invalidateQuery = (queryKey: any) =>
  queryClient.invalidateQueries({ queryKey })

export default queryClient;
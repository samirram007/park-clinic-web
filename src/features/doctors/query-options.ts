import { queryOptions } from '@tanstack/react-query'
import { doctorService } from './services/api'

export const doctorQueries = {
  all: () => ['doctors'] as const,
  list: (type?: string) =>
    queryOptions({
      queryKey: [...doctorQueries.all(), type ?? 'all'],
      queryFn: () => doctorService.getDoctors(type),
    }),
  detail: (id: number) =>
    queryOptions({
      queryKey: [...doctorQueries.all(), 'detail', id],
      queryFn: () => doctorService.getDoctor(id),
      enabled: !!id,
    }),
}

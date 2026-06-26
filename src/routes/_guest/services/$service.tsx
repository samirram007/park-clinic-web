import { createFileRoute } from '@tanstack/react-router'
import ServiceDepartment from '@/features/services/components/services/ServiceDepartment'

export const Route = createFileRoute('/_guest/services/$service')({
  component: ServiceRoute,
})

function ServiceRoute() {
  const { service } = Route.useParams()

  return <ServiceDepartment department={service} />
}

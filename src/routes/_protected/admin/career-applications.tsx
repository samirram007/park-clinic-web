import { CareerApplications } from '@/features/admin/components/career-applications'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/career-applications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CareerApplications />
}

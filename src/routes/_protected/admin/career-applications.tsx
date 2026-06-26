import { createFileRoute } from '@tanstack/react-router'
import { CareerApplications } from '@/features/admin/components/career-applications'

export const Route = createFileRoute('/_protected/admin/career-applications')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CareerApplications />
}

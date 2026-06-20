import { DoctorManagement } from '@/features/admin/components/doctor-management'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_protected/admin/doctors')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DoctorManagement />
}

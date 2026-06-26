import { createFileRoute } from '@tanstack/react-router'
import { DoctorManagement } from '@/features/admin/components/doctor-management'

export const Route = createFileRoute('/_protected/admin/doctors')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DoctorManagement />
}

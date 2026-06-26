import { createFileRoute } from '@tanstack/react-router'
import DoctorDetail from '@/features/doctors/components/doctor-detail'

export const Route = createFileRoute('/_guest/doctors/$doctorId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DoctorDetail />
}

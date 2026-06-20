import DoctorDetail from '@/features/doctors/components/doctor-detail'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/doctors/$doctorId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DoctorDetail />
}

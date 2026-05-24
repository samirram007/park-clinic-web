import { createFileRoute } from '@tanstack/react-router'
import { Departments } from '@/features/Departments'

export const Route = createFileRoute('/_guest/departments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Departments />
}

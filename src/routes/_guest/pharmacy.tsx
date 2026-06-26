import { createFileRoute } from '@tanstack/react-router'
import PharmacyComponent from '@/features/pharmacy'

export const Route = createFileRoute('/_guest/pharmacy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PharmacyComponent />
}

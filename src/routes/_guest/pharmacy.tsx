import PharmacyComponent from '@/features/pharmacy'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/pharmacy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PharmacyComponent/>
}

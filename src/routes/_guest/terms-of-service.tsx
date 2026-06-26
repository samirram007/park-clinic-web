import { createFileRoute } from '@tanstack/react-router'
import TermsOfService from '@/features/terms-of-service'

export const Route = createFileRoute('/_guest/terms-of-service')({
  component: RouteComponent,
})

function RouteComponent() {
  return <TermsOfService />
}

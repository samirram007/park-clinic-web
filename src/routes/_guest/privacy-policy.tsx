import PrivacyPolicy from '@/features/privacy-policy'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/privacy-policy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PrivacyPolicy />
}

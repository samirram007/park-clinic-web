import { createFileRoute } from '@tanstack/react-router'
import PrivacyPolicy from '@/features/privacy-policy'

export const Route = createFileRoute('/_guest/privacy-policy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <PrivacyPolicy />
}

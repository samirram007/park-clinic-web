import { createFileRoute } from '@tanstack/react-router'
import { Contact } from '@/features/contact'

export const Route = createFileRoute('/_guest/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Contact />
}

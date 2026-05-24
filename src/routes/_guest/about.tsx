import { createFileRoute } from '@tanstack/react-router'
import { About } from '@/features/about'

export const Route = createFileRoute('/_guest/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return <About />
}

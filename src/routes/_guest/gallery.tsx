import { createFileRoute } from '@tanstack/react-router'

import { Gallery } from '@/features/gallery'

export const Route = createFileRoute('/_guest/gallery')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Gallery />
}

import SitemapPage from '@/features/sitemap'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/sitemap')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SitemapPage />
}

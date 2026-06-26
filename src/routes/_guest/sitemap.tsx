import { createFileRoute } from '@tanstack/react-router'
import SitemapPage from '@/features/sitemap'

export const Route = createFileRoute('/_guest/sitemap')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SitemapPage />
}

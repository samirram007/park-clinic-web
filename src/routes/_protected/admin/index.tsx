import { createFileRoute } from '@tanstack/react-router'
import { ContactMessageComponent } from '@/features/admin/components/contact_message'

export const Route = createFileRoute('/_protected/admin/')({
  component: ContactMessageComponent,
})

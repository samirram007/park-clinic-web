import { ContactMessageComponent  } from '@/features/admin/components/contact_message'
import { createFileRoute } from '@tanstack/react-router'
 

export const Route = createFileRoute('/_protected/admin/contacts')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ContactMessageComponent/>
}

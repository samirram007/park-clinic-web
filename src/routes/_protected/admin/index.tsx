import { createFileRoute } from '@tanstack/react-router'
import { ContactMessageComponent } from '@/features/admin/components/contact_message'

export const Route = createFileRoute('/_protected/admin/')({
  component: AdminDashboardPage,
})

function AdminDashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
      <ContactMessageComponent />
    </div>
  )
}

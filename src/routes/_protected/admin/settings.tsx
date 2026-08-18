import { createFileRoute } from '@tanstack/react-router'
import { ChatSettings } from '@/features/admin/components/chat-settings'

export const Route = createFileRoute('/_protected/admin/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Configure application settings and preferences
        </p>
      </div>
      <ChatSettings />
    </div>
  )
}

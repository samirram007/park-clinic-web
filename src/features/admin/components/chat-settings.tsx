import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MessageCircle, Loader2 } from 'lucide-react'
import { settingsService } from '../data/api'

export function ChatSettings() {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['chat-widget-settings'],
    queryFn: () => settingsService.getChatWidgetStatus(),
  })

  const mutation = useMutation({
    mutationFn: (enabled: boolean) => settingsService.updateChatWidget(enabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chat-widget-settings'] })
    },
  })

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-rose-100 rounded-full p-2.5">
            <MessageCircle size={22} className="text-rose-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Chat Widget</h3>
            <p className="text-sm text-slate-500">
              Show the floating chat widget on guest pages
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {mutation.isPending && <Loader2 size={16} className="animate-spin text-slate-400" />}
          {isLoading ? (
            <div className="w-12 h-6 bg-slate-200 rounded-full animate-pulse" />
          ) : (
            <button
              onClick={() => mutation.mutate(!data?.enabled)}
              disabled={mutation.isPending}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer disabled:cursor-not-allowed ${
                data?.enabled ? 'bg-rose-600' : 'bg-slate-300'
              }`}
              role="switch"
              aria-checked={data?.enabled ?? false}
              aria-label="Toggle chat widget visibility"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm ${
                  data?.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          )}
          <span className="text-sm font-medium text-slate-700 min-w-12">
            {data?.enabled ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>
    </div>
  )
}

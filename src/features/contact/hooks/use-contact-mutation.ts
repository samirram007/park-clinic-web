import { useMutation } from '@tanstack/react-query'
import { contactService } from '@/core/services/api.service'
import { toast } from 'sonner'
import type { ContactFormData } from '../schema'

export const useContactMutation = (options?: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: (data: ContactFormData) => contactService.submitMessage(data),
    onSuccess: () => {
      toast.success('Message sent successfully!')
      options?.onSuccess?.()
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to send message. Please try again.'
      toast.error(message)
    },
  })
}

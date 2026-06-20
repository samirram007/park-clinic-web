import { useMutation } from '@tanstack/react-query'
import { careerService } from '@/core/services/api.service'
import { toast } from 'sonner'
import { AnimatedSuccessToast } from '@/features/career/components/animated-success-toast'

export const useCareerMutation = (options?: { onSuccess?: () => void }) => {
  return useMutation({
    mutationFn: (formData: FormData) => careerService.apply(formData),
    onSuccess: () => {
      toast.custom(
        (_t) => (
          <AnimatedSuccessToast
            title="Application Submitted!"
            description="We'll review your application and get back to you."
          />
        ),
        {
          duration: 5000,
          className: '!bg-white !shadow-lg !border !border-emerald-100 !rounded-2xl !px-4 !py-3',
        },
      )
      options?.onSuccess?.()
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Failed to submit application. Please try again.'
      toast.error(message)
    },
  })
}

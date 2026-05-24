import { createFileRoute } from '@tanstack/react-router'
import { Login } from '@/features/auth/components/login'

export const Route = createFileRoute('/_guest/login')({
  component: Login,
})

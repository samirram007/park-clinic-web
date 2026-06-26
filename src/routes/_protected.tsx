import { createFileRoute, redirect } from '@tanstack/react-router'
import ProtectedLayout from '@/layouts/protected/protected-layout'

export const Route = createFileRoute('/_protected')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <ProtectedLayout />
    </>
  )
}

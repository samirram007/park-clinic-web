import ProtectedLayout from '@/layouts/protected/protected-layout'
import { createFileRoute, redirect } from '@tanstack/react-router'

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

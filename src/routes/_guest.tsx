 
import GuestLayout from '@/layouts/guest-layout'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest')({
 beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({ to: '/admin' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
   <GuestLayout />
    </>
  )
}

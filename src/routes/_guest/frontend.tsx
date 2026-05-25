 
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/frontend')({
 beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({ to: '/admin' })
    }
    throw redirect({ to: '/' })
  },
 
})

 
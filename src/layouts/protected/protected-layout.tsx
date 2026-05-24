import { Outlet } from '@tanstack/react-router'
import ProtectedFooter from './components/protected-footer'
import ProtectedHeader from './components/protected-header'

export default function ProtectedLayout() {
  return (
    <>
      <ProtectedHeader />
      <Outlet />
      <ProtectedFooter />
    </>
  )
}

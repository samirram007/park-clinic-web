import { Outlet } from '@tanstack/react-router'
import { Helmet } from 'react-helmet-async'
import ProtectedFooter from './components/protected-footer'
import ProtectedHeader from './components/protected-header'

export default function ProtectedLayout() {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <ProtectedHeader />
      <Outlet />
      <ProtectedFooter />
    </>
  )
}

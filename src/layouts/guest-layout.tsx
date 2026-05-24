import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Outlet } from '@tanstack/react-router'

export default function GuestLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

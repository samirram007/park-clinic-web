import { useLayoutEffect, useState } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ScrollToTop from '@/components/ScrollToTop'
import { Outlet } from '@tanstack/react-router'

export default function GuestLayout() {
  const [headerHeight, setHeaderHeight] = useState(128)

  useLayoutEffect(() => {
    // Measure the fixed header element directly (not a wrapper div)
    const header = document.querySelector('header')
    if (!header) return

    const measured = header.getBoundingClientRect().height
    if (measured > 0) {
      setHeaderHeight(measured)
    }

    // Track height changes when header shrinks on scroll
    const observer = new ResizeObserver(([entry]) => {
      const h = entry.contentRect.height
      if (h > 0) setHeaderHeight(h)
    })
    observer.observe(header)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <Header />
      <div style={{ paddingTop: headerHeight }}>
        <Outlet />
      </div>
      <Footer />
      <ScrollToTop />
    </>
  )
}

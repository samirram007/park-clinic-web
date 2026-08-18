import { useLayoutEffect, useState } from 'react'
import { Outlet } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ScrollToTop from '@/components/ScrollToTop'
import ChatWidget from '@/features/contact/components/chat-widget'
import { settingsService } from '@/features/admin/data/api'

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

  const { data: chatSettings } = useQuery({
    queryKey: ['chat-widget-settings'],
    queryFn: () => settingsService.getChatWidgetStatus(),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  })
  const chatEnabled = chatSettings?.enabled ?? true

  return (
    <>
      <Header />
      <div style={{ paddingTop: headerHeight }}>
        <Outlet />
      </div>
      <Footer />
      <ScrollToTop />
      {chatEnabled && <ChatWidget />}
    </>
  )
}

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg cursor-pointer transition-colors duration-200"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

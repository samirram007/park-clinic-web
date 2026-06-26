import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

interface AnimatedSuccessToastProps {
  title: string
  description?: string
}

const checkVariants = {
  hidden: { scale: 0, rotate: -90 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 20,
      delay: 0.1,
    },
  },
}

const contentVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { delay: 0.3, duration: 0.35 },
  },
}

export const AnimatedSuccessToast = ({
  title,
  description,
}: AnimatedSuccessToastProps) => (
  <div className="flex items-start gap-3">
    <motion.div
      initial="hidden"
      animate="visible"
      variants={checkVariants}
      className="shrink-0 mt-0.5"
    >
      <CheckCircle2 size={28} className="text-emerald-500 drop-shadow-sm" />
    </motion.div>
    <motion.div
      initial="hidden"
      animate="visible"
      variants={contentVariants}
      className="min-w-0"
    >
      <p className="font-semibold text-slate-900 text-sm">{title}</p>
      {description && (
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      )}
    </motion.div>
  </div>
)

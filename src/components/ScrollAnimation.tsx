'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import React from 'react'

interface ScrollAnimationProps {
  children: React.ReactNode
  variant?: 'fadeUp' | 'slideLeft' | 'slideRight' | 'scaleIn'
  delay?: number
}

export default function ScrollAnimation({
  children,
  variant = 'fadeUp',
  delay = 0,
}: ScrollAnimationProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  const variants = {
    fadeUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
    },
    slideLeft: {
      initial: { opacity: 0, x: -40 },
      animate: { opacity: 1, x: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: 40 },
      animate: { opacity: 1, x: 0 },
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
  }

  return (
    <motion.div
      ref={ref}
      initial={variants[variant].initial}
      animate={isInView ? variants[variant].animate : variants[variant].initial}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function CareerPage() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '0px 0px -150px 0px' })

  return (
    <section ref={sectionRef} className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center mb-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-blue-600 font-semibold uppercase tracking-[0.3em] mb-4">Career</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Join our team of healthcare professionals and grow with us.
            </h1>
            <p className="mt-6 text-lg text-slate-600 max-w-2xl leading-8">
              We offer meaningful roles across clinical and administrative departments, plus opportunities to learn, lead, and make a real impact.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <a
                href="/career#vacancies"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200/40 hover:bg-blue-700 transition"
              >
                View current vacancies
              </a>
              <a
                href="#why-join"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-8 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:border-slate-400 transition"
              >
                Why join us
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
              <img
                src="/images/career.png"
                alt="Career at hospital"
                className="h-[420px] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-6 py-6 text-white">
                <p className="text-sm uppercase tracking-[0.25em] text-slate-200">Now hiring</p>
                <h2 className="mt-2 text-2xl font-semibold">We are hiring for multiple roles</h2>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-start">
          <motion.div
            id="why-join"
            className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm shadow-slate-200/40"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-blue-600 font-semibold uppercase tracking-[0.3em] mb-4">Why join us</p>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">A career that supports your growth.</h2>
            <ul className="space-y-4 text-slate-600 text-sm leading-7">
              <li>• Exposure to state-of-the-art medical technology</li>
              <li>• Exceptional opportunity to learn while you earn</li>
              <li>• Skill-based career growth and leadership pathways</li>
              <li>• Competitive, empowering work culture</li>
            </ul>
          </motion.div>

          <motion.div
            id="vacancies"
            className="rounded-[32px] border border-slate-200 bg-gradient-to-br from-slate-950 to-slate-900 p-8 text-white shadow-xl shadow-slate-900/20"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="max-w-md mx-auto text-center">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300 mb-3">Current Vacancies</p>
              <div className="inline-flex rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20">
                View 16 Job Opening(s)
              </div>
              <p className="mt-6 text-slate-300">Explore roles across departments and apply for positions that match your skill set and passion.</p>
              <div className="mt-8 grid gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
                >
                  Apply now
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-cyan-400 bg-cyan-500/10 px-5 py-3 text-sm font-semibold text-cyan-200 hover:bg-cyan-500/20 transition"
                >
                  Request more info
                </a>
                <a
                  href="/about"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20 transition"
                >
                  Our culture
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

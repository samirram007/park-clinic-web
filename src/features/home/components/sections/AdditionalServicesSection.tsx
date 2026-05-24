import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Baby, Syringe, Ambulance, TestTube } from 'lucide-react'
import { containerVariants, itemVariants } from '../animationVariants'
import { additionalServicesData } from '@/data/home/additional-services-section.data'

const iconMap: { [key: string]: any } = {
  Baby: Baby,
  Syringe: Syringe,
  Ambulance: Ambulance,
  TestTube: TestTube,
}

export default function AdditionalServicesSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: false, margin: '0px 0px -150px 0px' })

  return (
    <section ref={sectionRef} className="bg-sky-300 py-24 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center lg:text-left">
          
        </div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-stretch">
          <motion.div
            className="grid grid-cols-1 gap-6 h-full"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
          >
            {additionalServicesData.map((service, index) => {
              const IconComponent = iconMap[service.icon]
              return (
                <motion.div
                  key={index}
                  className="rounded-[28px] border border-sky-300 bg-sky-100 p-7 shadow-[0_20px_60px_rgba(56,189,248,0.15)] transition hover:-translate-y-1 hover:border-sky-400 hover:bg-sky-200"
                  variants={itemVariants}
                >
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 shadow-inner shadow-sky-500/10">
                    <IconComponent size={28} className="text-sky-600" />
                  </div>
                  <h4 className="text-xl font-semibold text-slate-900 mb-3">{service.title}</h4>
                  <p className="text-sm leading-7 text-slate-700">{service.description}</p>
                  <p className="text-sm leading-7 text-slate-700">{service.description1}</p>
                  <p className="text-sm leading-7 text-slate-700">{service.description2}</p>
                  <p className="text-sm leading-7 text-slate-700">{service.description3}</p>

                </motion.div>
              )
            })}
          </motion.div>

          <motion.div
            className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-slate-950 shadow-[0_35px_80px_rgba(15,23,42,0.45)] h-full min-h-[430px]"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img src="/images/haemati.png" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 to-transparent px-8 py-8">
             
             
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

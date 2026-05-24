import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { aboutPageData as data } from '@/data/about/about.data'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ZoomIn } from 'lucide-react'

export default function About() {
  const statsRef = useRef<HTMLElement>(null)
  const valuesRef = useRef<HTMLElement>(null)
  const accrRef = useRef<HTMLElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '0px 0px -100px 0px' })
  const valuesInView = useInView(valuesRef, { once: true, margin: '0px 0px -100px 0px' })
  const accrInView = useInView(accrRef, { once: true, margin: '0px 0px -100px 0px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="w-full overflow-x-hidden">
      <section className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-light text-white mb-8">{data.header.title}</h1>
          <p className="text-blue-100 text-lg">
            {data.header.description}
          </p>
           <p className="text-blue-100 text-lg">
            {data.header.description1}
          </p>
           <p className="text-blue-100 text-lg">
            {data.header.description2}
          </p>
            <p className="text-blue-100 text-lg">
            {data.header.description3}
          </p>
        </div>
      </section>

    
      <section ref={statsRef} className="bg-gradient-to-b from-white to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={statsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl font-light text-gray-900 mb-8 leading-tight">
                {data.mainContent.title}
              </h2>

              <p className="text-gray-600 text-base leading-relaxed mb-6">
                {data.mainContent.description1}
              </p>
              <p className="text-gray-600 text-base leading-relaxed mb-12">
                {data.mainContent.description2}
              </p>

              <motion.div
                className="grid grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate={statsInView ? 'show' : 'hidden'}
              >
                {data.stats.map((stat, index) => (
                  <motion.div key={index} className="bg-blue-50 p-6 rounded-lg text-center" variants={itemVariants}>
                    <p className="text-4xl font-light text-blue-600 mb-3">{stat.value}</p>
                    <p className="text-gray-700 text-sm font-light">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={statsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <img src="/images/herobg.jpg" alt="Healthcare Facility" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 right-0 transform translate-y-12 translate-x-12 w-40 h-40 rounded-full border-4 border-white overflow-hidden shadow-lg bg-white">
                <img src="/images/doc3.jpg" alt="Doctor" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      
      <section ref={valuesRef} className="bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            className="text-3xl font-light text-white mb-4 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            {data.valuesSection.title}
          </motion.h3>
          <motion.p
            className="text-blue-100 text-lg mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={valuesInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {data.valuesSection.description}
          </motion.p>

          <motion.div
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={valuesInView ? 'show' : 'hidden'}
          >
            {data.values.map((value, index) => (
              <motion.div key={index} className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20 hover:bg-white/95 transition-all duration-300" variants={itemVariants}>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-700">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

  
      <section ref={accrRef} className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={accrInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-4xl font-light text-white mb-6">
              {data.accreditations.title}
            </h3>
            <p className="text-blue-100 text-xl max-w-3xl mx-auto leading-relaxed">
              {data.accreditations.description}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center"
            variants={containerVariants}
            initial="hidden"
            animate={accrInView ? 'show' : 'hidden'}
          >
            {/* NABH Hospital */}
            <motion.div
              className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:border-white/40 hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 w-full max-w-sm overflow-hidden"
              variants={itemVariants}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="block">
                    <div className="relative overflow-hidden rounded-2xl mb-4">
                      <img src="/images/nabh.png" alt="NABH Hospital" className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold text-lg mb-1">NABH Hospital</p>
                      <p className="text-blue-200 font-medium text-sm">Accredited Healthcare Facility</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="w-[98vw] h-[98vh] max-w-none bg-white overflow-hidden p-0">
                  <div className="flex flex-col h-full">
                    <DialogHeader className="flex-shrink-0 p-6 bg-white border-b">
                      <DialogTitle className="text-2xl text-center text-gray-900">NABH Hospital Accreditation</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
                      <img src="/images/nabh.png" alt="NABH Hospital" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex-shrink-0 p-6 bg-white border-t">
                      <div className="text-center max-w-4xl mx-auto">
                        <p className="text-gray-700 text-lg font-medium mb-2">National Accreditation Board for Hospitals & Healthcare Providers</p>
                        <p className="text-gray-600 leading-relaxed">Our hospital has been accredited by NABH, ensuring the highest standards of patient safety, care quality, and operational excellence in healthcare delivery.</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>

            {/* NABL Laboratory */}
            <motion.div
              className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:border-white/40 hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 w-full max-w-sm overflow-hidden"
              variants={itemVariants}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="block">
                    <div className="relative overflow-hidden rounded-2xl mb-4">
                      <img src="/images/nabl.png" alt="NABL Laboratory" className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold text-lg mb-1">NABL Laboratory</p>
                      <p className="text-blue-200 font-medium text-sm">Certified Laboratory Services</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="w-[98vw] h-[98vh] max-w-none bg-white overflow-hidden p-0">
                  <div className="flex flex-col h-full">
                    <DialogHeader className="flex-shrink-0 p-6 bg-white border-b">
                      <DialogTitle className="text-2xl text-center text-gray-900">NABL Laboratory Certification</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
                      <img src="/images/nabl.png" alt="NABL Laboratory" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex-shrink-0 p-6 bg-white border-t">
                      <div className="text-center max-w-4xl mx-auto">
                        <p className="text-gray-700 text-lg font-medium mb-2">National Accreditation Board for Testing and Calibration Laboratories</p>
                        <p className="text-gray-600 leading-relaxed">Our laboratory services are accredited by NABL, guaranteeing accurate and reliable diagnostic testing with international quality standards.</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>

            {/* ISO Certified */}
            <motion.div
              className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:border-white/40 hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 w-full max-w-sm overflow-hidden"
              variants={itemVariants}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <div className="block">
                    <div className="relative overflow-hidden rounded-2xl mb-4">
                      <img src="/images/nabl.png" alt="ISO Certified" className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={32} />
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-white font-semibold text-lg mb-1">ISO Certified</p>
                      <p className="text-blue-200 font-medium text-sm">Global Quality Standards</p>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="w-[98vw] h-[98vh] max-w-none bg-white overflow-hidden p-0">
                  <div className="flex flex-col h-full">
                    <DialogHeader className="flex-shrink-0 p-6 bg-white border-b">
                      <DialogTitle className="text-2xl text-center text-gray-900">ISO Certification</DialogTitle>
                    </DialogHeader>
                    <div className="flex-1 flex items-center justify-center bg-gray-50 p-8">
                      <img src="/images/nabl.png" alt="ISO Certified" className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex-shrink-0 p-6 bg-white border-t">
                      <div className="text-center max-w-4xl mx-auto">
                        <p className="text-gray-700 text-lg font-medium mb-2">International Organization for Standardization</p>
                        <p className="text-gray-600 leading-relaxed">We maintain ISO certification, demonstrating our commitment to quality management systems and continuous improvement in healthcare services.</p>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </motion.div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={accrInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-blue-200 text-sm">
              Click on any certification to view details • Our certifications ensure the highest standards of healthcare excellence
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

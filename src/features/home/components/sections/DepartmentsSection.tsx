import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { departmentsSectionData } from '@/data/home/departments-section.data'

export default function DepartmentsSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: false, margin: '0px 0px -150px 0px' })

  return (
    <section ref={sectionRef} className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-600 font-light text-sm mb-4">{departmentsSectionData.tag}</p>
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            {departmentsSectionData.title}
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            {departmentsSectionData.description}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-light text-gray-900 mb-4">{departmentsSectionData.featured.name}</h3>
            <p className="text-gray-600 mb-4">{departmentsSectionData.featured.description}</p>
            <ul className="space-y-2 text-gray-700 mb-6">
              {departmentsSectionData.featured.services.map((service, index) => (
                <li key={index}>• {service}</li>
              ))}
            </ul>
            
          </motion.div>
          <motion.div
            className="bg-gradient-to-br from-blue-200 to-blue-100 h-64 rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="/images/dept-spine.jpg" 
              alt="Cardiology" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        {departmentsSectionData.specialties.map((specialty, index) => (
          <div key={index} className="grid md:grid-cols-2 gap-12 mb-16">
            <motion.div
              className={`bg-gradient-to-br from-gray-300 to-gray-200 h-64 rounded-2xl overflow-hidden ${index === 1 ? 'order-2' : ''}`}
              initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index === 0 ? -30 : 30 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <img 
                src={specialty.image}
                alt={specialty.name} 
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className={`flex flex-col justify-center ${index === 1 ? 'order-1' : ''}`}
              initial={{ opacity: 0, x: index === 0 ? 30 : -30 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index === 0 ? 30 : -30 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <h3 className="text-2xl font-light text-gray-900 mb-4">{specialty.name}</h3>
              <p className="text-gray-600 mb-4">{specialty.description}</p>
              <ul className="space-y-2 text-gray-700 mb-6">
                {specialty.services.map((service, sIdx) => (
                  <li key={sIdx}>• {service}</li>
                ))}
              </ul>
            
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}

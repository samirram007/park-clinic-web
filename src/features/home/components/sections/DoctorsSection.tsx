import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'
import { doctorsSectionData } from '@/data/home/doctors-section.data'
import { containerVariants, itemVariants } from '../animationVariants'

export default function DoctorsSection() {
  const sectionRef = useRef(null)

  return (
    <section ref={sectionRef} className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-600 font-light text-sm mb-4">{doctorsSectionData.tag}</p>
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            {doctorsSectionData.title}
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            {doctorsSectionData.description}
          </p>
        </motion.div>
        
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          variants={containerVariants}
        >
          {doctorsSectionData.doctors.map((doctor) => (
            <motion.div 
              key={doctor.id}
              className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              variants={itemVariants}
            >
              <div className="bg-gradient-to-br from-blue-300 to-blue-200 h-56 flex items-center justify-center overflow-hidden">
                <img 
                  src={doctor.image} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-light text-gray-900 mb-1">{doctor.name}</h3>
                <p className="text-blue-600 text-sm font-light mb-4">{doctor.title}</p>
                
                <div className="flex items-center gap-1 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        className={i < Math.floor(doctor.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{doctor.rating}</span>
                  <span className="text-xs text-gray-500">({doctor.reviews})</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <a href='/doctors' className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-light transition">
            View All Doctors
          </a>
        </div>
      </div>
    </section>
  )
}

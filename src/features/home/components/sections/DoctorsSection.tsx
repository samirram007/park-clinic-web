import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Loader2, Star } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { containerVariants, itemVariants } from '../animationVariants'
import { doctorQueries } from '@/features/doctors/query-options'
import { getDoctorImageUrl } from '@/features/doctors/services/api'

export default function DoctorsSection() {
  const sectionRef = useRef(null)
  const { data: doctors, isLoading } = useQuery(
    doctorQueries.list('consultant'),
  )

  // Filter to only show doctors that include 'consultant' in their type array
  const consultantDoctors = (doctors ?? []).filter((d) =>
    d.type.includes('consultant'),
  )

  if (isLoading) {
    return (
      <section
        ref={sectionRef}
        className="bg-gray-50 py-20 flex items-center justify-center"
      >
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-600 font-light text-sm mb-4">OUR DOCTORS</p>
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            Find a Doctor
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Find Your Perfect Healthcare Provider
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          variants={containerVariants}
        >
          {consultantDoctors.slice(0, 6).map((doctor) => (
            <motion.div
              key={doctor.id}
              className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition"
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              variants={itemVariants}
            >
              <div className="bg-gradient-to-br from-blue-300 to-blue-200 h-56 flex items-center justify-center overflow-hidden">
                <img
                  src={getDoctorImageUrl(doctor.id)}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-lg font-light text-gray-900">
                    {doctor.name}
                  </h3>
                  {doctor.type.length > 1 && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider bg-gradient-to-r from-blue-100 to-amber-100 text-slate-600 shrink-0 mt-1">
                      Both
                    </span>
                  )}
                </div>
                <p className="text-blue-600 text-sm font-light mb-4">
                  {doctor.title ?? doctor.department}
                </p>

                <div className="flex items-center gap-1 mb-4">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          doctor.rating && i < Math.floor(doctor.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {doctor.rating ?? '-'}
                  </span>
                  {doctor.reviews && (
                    <span className="text-xs text-gray-500">
                      ({doctor.reviews})
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <a
            href="/doctors"
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-light transition"
          >
            View All Doctors
          </a>
        </div>
      </div>
    </section>
  )
}

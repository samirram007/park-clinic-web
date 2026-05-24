import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Smartphone, UserCog, Trophy, Lightbulb } from 'lucide-react'
import { containerVariants, itemVariants } from '../animationVariants'
import { excellenceData } from '@/data/home/excellence-section.data'

const iconMap: { [key: string]: any } = {
  Smartphone: Smartphone,
  UserCog: UserCog,
  Trophy: Trophy,
  Lightbulb: Lightbulb,
}

export default function ExcellenceSection() {
  const sectionRef = useRef(null)

  return (
    <section ref={sectionRef} className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-blue-600 font-light text-sm mb-4">{excellenceData.tag}</p>
          <h2 className="text-4xl font-light text-gray-900 mb-4">
            {excellenceData.title}
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            {excellenceData.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={containerVariants}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            {excellenceData.benefits.map((benefit, index) => {
              const IconComponent = iconMap[benefit.icon]
              return (
                <motion.div 
                  key={index}
                  className={`bg-gradient-to-br ${benefit.gradient} p-6 rounded-xl hover:shadow-md transition border ${benefit.border}`}
                  variants={itemVariants}
                >
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white mb-4">
                    <IconComponent size={24} />
                  </div>
                  <h4 className="font-light text-gray-900 mb-2">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-gray-200 to-gray-100 h-96 rounded-2xl flex items-center justify-center overflow-hidden">
              <img 
                src="/images/featureimg.jpg" 
                alt="Medical Care" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white text-center"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-3xl font-light mb-4">{excellenceData.cta.title}</h3>
          <p className="mb-6 text-lg max-w-2xl mx-auto">{excellenceData.cta.description}</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-light hover:bg-gray-100 transition">
            {excellenceData.cta.buttonText}
          </button>
        </motion.div>
      </div>
    </section>
  )
}

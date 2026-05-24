import { useRef } from 'react'
import { Activity, HeartPulse, Zap, Pill, Stethoscope } from 'lucide-react'
import { featuredServicesData } from '@/data/home/featured-services-section.data'

const iconMap: { [key: string]: any } = {
  Building: Zap,
  Pill: Pill,
  Stethoscope: Stethoscope,
  HeartPulse: HeartPulse,
  Activity: Activity,
}

const highlightCards = [
  {
    image: '/images/emergency1.jpeg',
    alt: 'Maternal Care',
    title: 'Emergency Care',
  },
  {
    image: '/images/indoor1.jpeg',
    alt: 'Vaccination',
    title: 'Indoor Services',

  },
  {
    image: '/images/diagnos1.jpeg',
    alt: 'Emergency Care',
    title: 'Diagnostic Services',
    description: '24/7 critical care services',
  },
  {
    image: '/images/opd1.jpeg',
    alt: 'Advanced Technology',
    title: 'Outdoor Services',
  },
  {
    image: '/images/ot1.jpeg',
    alt: 'Telemedicine',
    title: 'Operation Theatre',
  
  },
   {
    image: '/images/cost.png',
    alt: 'Telemedicine',
    title: 'Affordable Price',
  
  },
]

export default function FeaturedServicesSection() {
  const sectionRef = useRef(null)

  return (
    <section ref={sectionRef} className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-4">{featuredServicesData.title}</h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto">{featuredServicesData.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16 items-start justify-center">
            <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-full min-h-[420px] rounded-2xl overflow-hidden flex items-center justify-center relative">
              <img src="/images/fea1.png" alt="Emergency Care" className="w-full h-full object-cover" />
              <div className="absolute top-6 left-6 bg-white px-6 py-2 rounded-full">
                <p className="text-blue-600 font-light text-sm">{featuredServicesData.services[0].title}</p>
              </div>
            </div>

            <div className="h-full">
              {featuredServicesData.services.map((service, index) => {
                const IconComponent = iconMap[service.icon]
                const iconColors = [
                  { bg: 'bg-blue-500', icon: 'text-white' },
                  { bg: 'bg-purple-500', icon: 'text-white' },
                  { bg: 'bg-blue-400', icon: 'text-white' },
                  { bg: 'bg-green-500', icon: 'text-white' },
                ]
                const colors = iconColors[index % iconColors.length]

                return (
                  <div key={index}>
                    <div className="flex gap-4 py-6">
                      <div className="flex-shrink-0">
                        <div className={`flex items-center justify-center h-14 w-14 rounded-full ${colors.bg}`}>
                          <IconComponent size={28} className={colors.icon} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-2">{service.description}</p>
                      </div>
                    </div>
                    {index < featuredServicesData.services.length - 1 && (
                      <div className="border-b border-gray-200"></div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-8 justify-items-center">
              {highlightCards.map((card) => (
                <div key={card.title} className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full overflow-hidden mb-4">
                    <img src={card.image} alt={card.alt} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-light text-gray-900">{card.title}</h4>
                  <p className="text-sm text-gray-600">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

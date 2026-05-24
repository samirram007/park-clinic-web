'use client'

import { infoSectionData } from '@/data/home/info-section.data'

export default function InfoSection() {
  return (
    <section className="bg-blue-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {infoSectionData.map((info, index) => (
            <div key={index}>
              <p className="text-blue-200 text-sm mb-2">{info.label}</p>
              <p className="text-2xl font-light">{info.value}</p>
              {info.subLabel && <p className="text-blue-200 text-sm">{info.subLabel}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

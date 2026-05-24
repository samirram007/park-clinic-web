'use client'

import { departmentsPageData as data } from '@/data/departments/departments-page.data'

export default function Departments() {
  const { departments: depts, departmentsGrid: grid } = data

  return (
    <div className="w-full overflow-x-hidden">
      <section className="bg-linear-to-r from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-light text-gray-900 mb-4">{data.header.title}</h1>
          <p className="text-gray-600 text-lg">
            {data.header.description}
          </p>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 mb-12">
            {depts.map((dept) => (
              <button key={dept.name} className="px-6 py-2 bg-gray-100 hover:bg-blue-600 hover:text-white rounded-lg font-light transition">
                {dept.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {depts.map((dept, index) => (
            <div key={dept.name}>
              <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
                <div className={index % 2 === 1 ? 'order-2' : ''}>
                  <div className="bg-gray-300 h-64 rounded-lg overflow-hidden flex items-center justify-center">
                    {index === 0 && <img src="/images/dept-neuro.png" alt="Neurology" className="w-full h-full object-cover" />}
                    {index === 1 && <img src="/images/dept-ortho.png" alt="Surgery" className="w-full h-full object-cover" />}
                    {index === 2 && <img src="/images/dept-cardio.jpg" alt="Dental Care" className="w-full h-full object-cover" />}
                    {index === 3 && <img src="/images/dept-pedia.png" alt="Ophthalmology" className="w-full h-full object-cover" />}
                    {index === 4 && <img src="/images/doc1.jpg" alt="Cardiology" className="w-full h-full object-cover" />}
                  </div>
                </div>
                <div className={index % 2 === 1 ? 'order-1' : ''}>
                  <h3 className="text-3xl font-light text-gray-900 mb-4">{dept.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">{dept.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    {dept.services.map((service) => (
                      <div key={service} className="text-gray-700">
                        <p className="font-light">{service}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {grid.map((dept) => (
              <div key={dept.name} className="bg-white p-8 rounded-lg hover:shadow-lg transition">
                <div className="bg-gray-300 h-48 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
                  {dept.name === 'Cardiology' && <img src="/images/dept-cardio.jpg" alt="Cardiology" className="w-full h-full object-cover" />}
                  {dept.name === 'Neurology' && <img src="/images/dept-neuro.png" alt="Neurology" className="w-full h-full object-cover" />}
                  {dept.name === 'Orthopedics' && <img src="/images/dept-ortho.png" alt="Orthopedics" className="w-full h-full object-cover" />}
                  {dept.name === 'Pediatrics' && <img src="/images/dept-pedia.png" alt="Pediatrics" className="w-full h-full object-cover" />}
                  {dept.name === 'Dermatology' && <img src="/images/doc2.jpg" alt="Dermatology" className="w-full h-full object-cover" />}
                  {dept.name === 'Oncology' && <img src="/images/doc3.jpg" alt="Oncology" className="w-full h-full object-cover" />}
                </div>
                <h4 className="text-xl font-light text-gray-900 mb-3">{dept.name}</h4>
                <p className="text-gray-600 mb-6 text-sm">{dept.description}</p>
                <button className="text-blue-600 font-light hover:underline">Learn More →</button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

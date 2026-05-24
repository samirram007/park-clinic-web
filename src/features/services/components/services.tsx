import { servicesPageData } from "@/data/services-page.data"

export default function Services() {
  const { header, services } = servicesPageData

  return (
    <div className="w-full overflow-x-hidden">
      <section className="bg-linear-to-r from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-light text-gray-900 mb-4">{header.title}</h1>
          <p className="text-gray-600 text-lg">{header.description}</p>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service) => (
              <div key={service.name} className="border-l-4 border-blue-600 pl-8">
                <div className="bg-gray-300 h-48 rounded-lg mb-6 flex items-center justify-center">
                  <img src={service.image} alt={service.name} className="object-cover h-full w-full rounded-lg" />
                </div>
                <h3 className="text-2xl font-light text-gray-900 mb-3">{service.name}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                <div className="flex flex-col gap-4 mb-4">
                  {service.features.map((feature) => (
                    <p key={feature} className="flex flex-row gap-4 text-gray-700 font-light text-sm">
                      <span className="text-blue-600">●</span><span className="text-justify">{feature}</span> 
                    </p>
                  ))}
                </div>
                <button className="text-blue-600 font-light hover:underline">
                  Learn More →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

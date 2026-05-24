import { emergencyBannerData } from '@/data/home/emergency-banner-section.data'

export default function EmergencyBannerSection() {
  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h2 className="text-4xl font-light mb-4">{emergencyBannerData.title}</h2>
            <p className="text-lg text-blue-100 max-w-2xl mb-2">
              {emergencyBannerData.description}
            </p>
            <p className="text-xl font-light text-white">{emergencyBannerData?.phoneNumber}</p>
          </div>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-light hover:bg-gray-100 transition whitespace-nowrap ml-0 md:ml-8">
            {emergencyBannerData.buttonText}
          </button>
        </div>
      </div>
    </section>
  )
}

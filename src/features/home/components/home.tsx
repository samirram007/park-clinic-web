import HeroSection from './sections/HeroSection'
import InfoSection from './sections/InfoSection'
import AboutSection from './sections/AboutSection'
import DepartmentsSection from './sections/DepartmentsSection'
import EmergencyBannerSection from './sections/EmergencyBannerSection'
import FeaturedServicesSection from './sections/FeaturedServicesSection'
// import DoctorsSection from './sections/DoctorsSection'
// import ExcellenceSection from './sections/ExcellenceSection'
import AdditionalServicesSection from './sections/AdditionalServicesSection'
import VisualTourSection from './sections/VisualTourSection'

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden">
      <HeroSection />
      <InfoSection />
      <AboutSection />
      <DepartmentsSection />
      <EmergencyBannerSection />
      <FeaturedServicesSection />
      {/* <DoctorsSection /> */}
      {/* <ExcellenceSection /> */}
      <VisualTourSection />
      <AdditionalServicesSection />
    </main>
  )
}
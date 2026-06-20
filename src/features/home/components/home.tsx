import SEO from '@/components/SEO'
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
    <>
      <SEO
        title="Park Sonoscan Clinic"
        description="Park Sonoscan Clinic in Kolkata provides advanced healthcare with experienced doctors, modern diagnostics, and 24/7 emergency services. Your health, our priority."
        canonicalUrl="/"
        ogType="website"
      />
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
    </>
  )
}
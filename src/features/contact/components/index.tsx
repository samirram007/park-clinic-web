import { Clock, Mail, Phone } from 'lucide-react'
import ContactForm from './contact-form'
import GoogleMap from './google-map'
import { contactPageData as data } from '@/data/contact/contact.data'
import SEO from '@/components/SEO'

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch with Park Sonoscan Clinic in Kolkata. Call us, email us, or visit us for appointments and inquiries. We're here 24/7 for your healthcare needs."
        canonicalUrl="/contact"
      />
      <div className="w-full overflow-x-hidden bg-slate-50">
        {/* Hero Section */}
        <section className="bg-blue-700 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
            </svg>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {data.header.title} Us
            </h1>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto leading-relaxed">
              We're here to provide the care and support you need. Reach out to
              us through any of the channels below.
            </p>
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 -mt-10 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                  <Phone size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Emergency Contact
                </h3>
                <p className="text-blue-600 font-bold text-lg">
                  +91 9775992022
                </p>
                <p className="text-slate-500 mt-1">
                  Available 24/7 for emergencies
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                  <Mail size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Email Support
                </h3>
                <p className="text-slate-600">
                  {data.contactInfo.email.values[0]}
                </p>
                <p className="text-slate-500 mt-1">
                  We'll respond within 24 hours
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                  <Clock size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Working Hours
                </h3>
                <p className="text-slate-600">365 Days / 24 Hours</p>
                <p className="text-slate-500 mt-1">
                  Admission facilities open always
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content: Form & Map Side-by-Side */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">
              {/* Contact Form */}
              <div className="lg:w-1/2">
                <ContactForm />
              </div>

              {/* Google Map */}
              <div className="lg:w-1/2 bg-slate-100">
                <GoogleMap />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

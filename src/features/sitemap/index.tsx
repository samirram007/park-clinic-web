import { Link } from '@tanstack/react-router'
import SEO from '@/components/SEO'

interface SiteLink {
  to: string
  label: string
  description: string
  params?: Record<string, string>
}

interface SiteSection {
  title: string
  links: Array<SiteLink>
}

const sections: Array<SiteSection> = [
  {
    title: 'Main Pages',
    links: [
      {
        to: '/',
        label: 'Home',
        description:
          'Welcome to Park Sonoscan Clinic — your trusted healthcare provider.',
      },
      {
        to: '/about',
        label: 'About Us',
        description: 'Learn about our clinic, mission, and healthcare team.',
      },
      {
        to: '/departments',
        label: 'Departments',
        description: 'Explore our medical departments and specialties.',
      },
      {
        to: '/doctors',
        label: 'Doctors',
        description: 'Meet our team of experienced healthcare professionals.',
      },
    ],
  },
  {
    title: 'Patient Services',
    links: [
      {
        to: '/services/$service',
        label: 'Indoor Services',
        description: 'In-patient care and accommodation services.',
        params: { service: 'Indoor Services' },
      },
      {
        to: '/services/$service',
        label: 'Diagnostic Services',
        description: 'Advanced diagnostic and imaging services.',
        params: { service: 'Diagnostic Services' },
      },
      {
        to: '/services/$service',
        label: 'Outdoor Services',
        description: 'Out-patient consultation and treatment.',
        params: { service: 'Outdoor Services' },
      },
      {
        to: '/pharmacy',
        label: 'Pharmacy',
        description: 'Our on-site pharmacy for your medication needs.',
      },
    ],
  },
  {
    title: 'Contact & Careers',
    links: [
      {
        to: '/contact',
        label: 'Contact Us',
        description: 'Get in touch with us for inquiries and appointments.',
      },
      {
        to: '/career',
        label: 'Career',
        description: 'Explore job opportunities and apply to join our team.',
      },
    ],
  },
  {
    title: 'Media & Gallery',
    links: [
      {
        to: '/gallery',
        label: 'Gallery',
        description: 'View photos and virtual tour of our clinic facilities.',
      },
    ],
  },
  {
    title: 'Legal & Support',
    links: [
      {
        to: '/privacy-policy',
        label: 'Privacy Policy',
        description:
          'How we collect, use, and protect your personal information.',
      },
      {
        to: '/terms-of-service',
        label: 'Terms of Service',
        description: 'Terms and conditions for using our website and services.',
      },
    ],
  },
]

export default function SitemapPage() {
  return (
    <>
      <SEO
        title="Sitemap"
        description="Complete site map of Park Sonoscan Clinic — find all pages, services, and information available on our website."
        canonicalUrl="/sitemap"
      />

      <div className="bg-white">
        <section className="bg-slate-900 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Sitemap
            </h1>
            <p className="text-slate-400 text-lg">
              Browse all pages and sections available on our website.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {sections.map((section) => (
              <div
                key={section.title}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200"
              >
                <h2 className="text-xl font-bold text-slate-900 mb-4 pb-3 border-b border-slate-200">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.to}
                        params={link.params || {}}
                        className="group block p-3 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-200"
                      >
                        <span className="text-blue-600 font-medium group-hover:text-blue-700">
                          {link.label}
                        </span>
                        <p className="text-sm text-slate-500 mt-0.5">
                          {link.description}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100 text-center">
            <p className="text-slate-600">
              Can't find what you're looking for?{' '}
              <Link
                to="/contact"
                className="text-blue-600 hover:text-blue-800 font-medium underline"
              >
                Contact us
              </Link>{' '}
              and we'll be happy to help.
            </p>
          </div>
        </section>
      </div>
    </>
  )
}

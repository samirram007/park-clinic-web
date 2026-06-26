import SEO from '@/components/SEO'
import { company } from '@/lib/company'

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description={`Read ${company.name}'s privacy policy to understand how we collect, use, and protect your personal health information.`}
        canonicalUrl="/privacy-policy"
      />

      <div className="bg-white">
        <section className="bg-slate-900 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-slate-400 text-lg">
              Last updated: June 18, 2026
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-8">
            <Section title="1. Introduction">
              <p>
                {company.name} ("we," "our," or "us") is committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                website or use our services.
              </p>
              <p className="mt-3">
                By using our website and services, you agree to the collection
                and use of information in accordance with this policy.
              </p>
            </Section>

            <Section title="2. Information We Collect">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                Personal Information
              </h3>
              <p className="mb-3">
                We may collect personally identifiable information such as:
              </p>
              <BulletList
                items={[
                  'Name, email address, phone number, and postal address',
                  'Medical history, symptoms, and health information you provide',
                  'Insurance details and billing information',
                  'Resume and employment history when applying for positions',
                ]}
              />
              <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-2">
                Automatically Collected Information
              </h3>
              <p>
                When you visit our website, we may automatically collect certain
                information including your IP address, browser type, operating
                system, referring URLs, and browsing behavior through cookies
                and similar technologies.
              </p>
            </Section>

            <Section title="3. How We Use Your Information">
              <p className="mb-3">
                We use the collected information for the following purposes:
              </p>
              <BulletList
                items={[
                  'To provide and maintain our healthcare services',
                  'To process appointment requests and respond to inquiries',
                  'To send important notices, updates, and appointment reminders',
                  'To process job applications and career inquiries',
                  'To improve our website, services, and patient experience',
                  'To comply with legal obligations and regulatory requirements',
                ]}
              />
            </Section>

            <Section title="4. Information Sharing and Disclosure">
              <p className="mb-3">
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information only in the
                following circumstances:
              </p>
              <BulletList
                items={[
                  'With your explicit consent',
                  'With healthcare providers involved in your treatment',
                  'With insurance companies for billing purposes',
                  'To comply with legal obligations or court orders',
                  'With service providers who assist us in operating our website and services (under strict confidentiality agreements)',
                ]}
              />
            </Section>

            <Section title="5. Data Security">
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no
                method of transmission over the Internet or electronic storage
                is 100% secure, and we cannot guarantee absolute security.
              </p>
            </Section>

            <Section title="6. Your Rights">
              <p className="mb-3">You have the right to:</p>
              <BulletList
                items={[
                  'Access the personal information we hold about you',
                  'Request correction of inaccurate information',
                  'Request deletion of your information, subject to legal retention requirements',
                  'Object to or restrict processing of your information',
                  'Withdraw consent at any time where we rely on your consent to process information',
                ]}
              />
            </Section>

            <Section title="7. Cookies">
              <p>
                Our website uses cookies and similar tracking technologies to
                enhance your browsing experience. You can control cookie
                preferences through your browser settings. Please note that
                disabling cookies may affect certain features of our website.
              </p>
            </Section>

            <Section title="8. Third-Party Links">
              <p>
                Our website may contain links to third-party websites. We are
                not responsible for the privacy practices or content of these
                external sites. We encourage you to review their privacy
                policies before providing any personal information.
              </p>
            </Section>

            <Section title="9. Children's Privacy">
              <p>
                Our services are not directed to individuals under the age of
                18. We do not knowingly collect personal information from
                children. If we become aware that a child has provided us with
                personal information, we will take steps to delete such
                information.
              </p>
            </Section>

            <Section title="10. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new policy on this page
                and updating the "Last updated" date. We encourage you to review
                this policy periodically.
              </p>
            </Section>

            <Section title="11. Contact Us">
              <p>
                If you have any questions, concerns, or requests regarding this
                Privacy Policy, please contact us:
              </p>
              <div className="mt-4 p-6 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-slate-700 font-semibold">{company.name}</p>
                <p className="text-slate-600 mt-1">{company.address}</p>
                <p className="text-slate-600 mt-1">Phone: {company.phone}</p>
                <p className="text-slate-600 mt-1">Email: {company.email}</p>
              </div>
            </Section>
          </div>
        </section>
      </div>
    </>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">{title}</h2>
      <div className="text-slate-600 leading-relaxed">{children}</div>
    </div>
  )
}

function BulletList({ items }: { items: Array<string> }) {
  return (
    <ul className="list-disc pl-6 text-slate-600 space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

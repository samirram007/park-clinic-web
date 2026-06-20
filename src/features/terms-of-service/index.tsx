import SEO from '@/components/SEO'
import { Link } from '@tanstack/react-router'
import { company } from '@/lib/company'

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service"
        description={`Review the terms and conditions for using ${company.name}'s website and services.`}
        canonicalUrl="/terms-of-service"
      />

      <div className="bg-white">
        <section className="bg-slate-900 py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-slate-400 text-lg">Last updated: June 18, 2026</p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-8">
            <Section title="1. Acceptance of Terms">
              <p>By accessing or using the {company.name} website and services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you should not use our website or services.</p>
            </Section>

            <Section title="2. Description of Services">
              <p>{company.name} provides healthcare-related information, appointment scheduling, contact services, and career application processing through our website. The information provided on this website is for general informational purposes only and does not constitute medical advice.</p>
            </Section>

            <Section title="3. User Responsibilities">
              <p className="mb-3">As a user of our website, you agree to:</p>
              <BulletList items={[
                'Provide accurate and complete information when using our forms or services',
                'Maintain the confidentiality of any account credentials provided',
                'Use the website in compliance with all applicable laws and regulations',
                'Not engage in any activity that disrupts or interferes with the website\'s functionality',
                'Not attempt to gain unauthorized access to any part of our systems',
              ]} />
            </Section>

            <Section title="4. Medical Disclaimer">
              <p>The content on our website, including text, graphics, images, and other materials, is for informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
            </Section>

            <Section title="5. Appointment and Service Booking">
              <p>While we strive to accommodate all appointment requests, submission of an appointment request through our website does not guarantee availability. We reserve the right to reschedule or cancel appointments as necessary. Please arrive at least 15 minutes before your scheduled appointment time.</p>
            </Section>

            <Section title="6. Intellectual Property">
              <p>All content, trademarks, and intellectual property on this website are owned by or licensed to {company.name}. You may not reproduce, distribute, modify, or create derivative works from any content on this website without our prior written consent.</p>
            </Section>

            <Section title="7. Limitation of Liability">
              <p>{company.name} shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to, use of, or inability to use our website or services. This includes, but is not limited to, damages for loss of profits, data, or other intangible losses.</p>
            </Section>

            <Section title="8. Privacy">
              <p>Your use of our website is also governed by our <Link to="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline">Privacy Policy</Link>. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.</p>
            </Section>

            <Section title="9. Third-Party Links">
              <p>Our website may contain links to third-party websites or services that are not owned or controlled by {company.name}. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites.</p>
            </Section>

            <Section title="10. Termination">
              <p>We reserve the right to terminate or suspend access to our website immediately, without prior notice, for any reason, including, without limitation, a breach of these Terms of Service.</p>
            </Section>

            <Section title="11. Changes to Terms">
              <p>We reserve the right to modify or replace these Terms of Service at any time. Changes will be effective immediately upon posting. Your continued use of the website after any changes constitutes acceptance of the new terms.</p>
            </Section>

            <Section title="12. Governing Law">
              <p>These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Kolkata, West Bengal.</p>
            </Section>

            <Section title="13. Contact Information">
              <p>If you have any questions about these Terms of Service, please contact us:</p>
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900 mb-4">{title}</h2>
      <div className="text-slate-600 leading-relaxed">{children}</div>
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc pl-6 text-slate-600 space-y-2">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  )
}

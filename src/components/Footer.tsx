import { Link } from '@tanstack/react-router'
import { Mail, Phone, MapPin } from 'lucide-react'
import { company } from '@/lib/company'

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-gray-800 font-light">C</span>
              </div>
              <span className="text-xl font-light">{company.name}</span>
            </div>
            <p className="text-gray-900 text-sm ">
              Providing exceptional healthcare with compassion and expertise.
            </p>
          </div>

          <div>
            <h4 className="font-light mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/" className="hover:text-gray-800">Home</Link></li>
              <li><Link to="/about" className="hover:text-gray-800">About Us</Link></li>
              <li><Link to="/pharmacy" className="hover:text-gray-800">Pharmacy</Link></li>
              <li><Link to="/admin" className="hover:text-gray-800 font-semibold text-blue-600">Admin Login</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-light mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/services/$service" params={{ service: 'Indoor Services' }} className="hover:text-gray-800">Indoor Services</Link></li>
              <li><Link to="/services/$service" params={{ service: 'Diagnostic Services' }} className="hover:text-gray-800">Diagnostic Services</Link></li>
              <li><Link to="/services/$service" params={{ service: 'Outdoor Services' }} className="hover:text-gray-800">Outdoor Services</Link></li>
              <li><Link to="/services/$service" params={{ service: 'Brain & Spine Surgery (Neurosciences)' }} className="hover:text-gray-800">Brain &amp; Spine Surgery</Link></li>
              <li><Link to="/services/$service" params={{ service: 'Orthopaedics & Spine Surgery' }} className="hover:text-gray-800">Orthopaedics &amp; Spine</Link></li>
              <li><Link to="/services/$service" params={{ service: 'Paediatrics & Childcare' }} className="hover:text-gray-800">Paediatrics &amp; Childcare</Link></li>
              <li><Link to="/services/$service" params={{ service: 'ENT & Maxillofacial Surgery' }} className="hover:text-gray-800">ENT &amp; Maxillofacial</Link></li>
              <li><Link to="/services/$service" params={{ service: 'General, Uro & Laparoscopic Surgery' }} className="hover:text-gray-800">General &amp; Laparoscopic</Link></li>
              <li><Link to="/services/$service" params={{ service: 'Laboratory Testing' }} className="hover:text-gray-800">Laboratory Testing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-light mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-900 hover:text-gray-800 cursor-pointer">
                <Phone size={16} />
                <span>{company.phone}</span>
              </li>
              <li className="flex items-center gap-2 text-gray-900 hover:text-gray-800 cursor-pointer">
                <Mail size={16} />
                <span>{company.email}</span>
              </li>
              <li className="flex items-start gap-2 text-gray-900">
                <MapPin size={16} className="mt-1" />
                <span>{company.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              &copy; 2024 - {new Date().getFullYear()} {company.shortName}. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</Link>
              <Link to="/sitemap" className="text-gray-400 hover:text-white">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from '@tanstack/react-router'
import { ChevronDown, Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '@/features/auth/contexts/auth-context'
import { company } from '@/lib/company'

const faceBookLink = 'https://www.facebook.com/profile.php?id=61585835171329'
const instagramLink = 'https://www.instagram.com/parksonoscan2568/'
const linkedinLink = 'https://www.facebook.com/profile.php?id=61585835171329'
const youtubeLink = 'https://www.facebook.com/profile.php?id=61585835171329'
const twiterLink = 'https://x.com/Parksonoscan5'

// Custom Brand Icons to replace deprecated Lucide icons
const FacebookIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const YoutubeIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.56 12.25c0-1.19-.93-2.16-2.1-2.16h-15.9c-1.17 0-2.1.97-2.1 2.16v7.68c0 1.19.93 2.16 2.1 2.16h15.9c1.17 0 2.1-.97 2.1-2.16v-7.68z" />
    <path d="M8 9v6l5-3z" />
  </svg>
)

const XIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
    <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
  </svg>
)

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Pharmacy', to: '/pharmacy' },
  { name: 'Doctors', to: '/doctors' },
  { name: 'Gallery', to: '/gallery' },
  { name: 'Career', to: '/career' },
  { name: 'Contact', to: '/contact' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const serviceLinks = [
    { name: 'Indoor Services', slug: 'Indoor Services' },
    { name: 'Diagnostic Services', slug: 'Diagnostic Services' },
    { name: 'Outdoor Services', slug: 'Outdoor Services' },
  ]

  const isServicesActive = location.pathname.startsWith('/services')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`w-full bg-white fixed top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-none'}`}
    >
      {/* Top Bar */}
      <div
        className={`bg-blue-700 text-white overflow-hidden transition-all duration-300 ${scrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-16 sm:max-h-12 py-2 opacity-100'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap sm:flex-nowrap justify-between items-center text-[11px] sm:text-sm gap-x-2 sm:gap-x-4">
          <div className="flex flex-row gap-2 sm:gap-6 items-center">
            <a
              href={`mailto:${company.email}`}
              className="hover:text-blue-200 transition truncate max-w-[130px] sm:max-w-none"
            >
              {company.email}
            </a>
            <a
              href={`tel:${company.phoneShort}`}
              className="font-light hover:text-blue-200 transition hidden sm:inline"
            >
              +91 {company.phoneShort}
            </a>
            <a
              href={`tel:${company.phoneShort}`}
              className="font-light hover:text-blue-200 transition sm:hidden"
            >
              Call Us
            </a>
          </div>
          <div className="flex gap-1.5 sm:gap-4 items-center">
            <a
              href={faceBookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition"
            >
              <FacebookIcon size={16} />
            </a>
            <a
              href={twiterLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition"
            >
              <XIcon size={16} />
            </a>
            <a
              href={linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition hidden sm:inline"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition hidden sm:inline"
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition hidden sm:inline"
            >
              <YoutubeIcon size={16} />
            </a>
            <div className="border-l border-blue-500 pl-1.5 sm:pl-4 ml-1 sm:ml-2">
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout()
                    navigate({ to: '/login' })
                  }}
                  className="hover:text-blue-200 transition"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" className="hover:text-blue-200 transition">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ... (rest of the header unchanged) ... */}

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
        <div className="flex justify-between items-center h-auto">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src="/logo192.png"
              alt="Logo"
              className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-12' : 'h-20'}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-4 font-medium text-[17px] items-center">
            {navLinks.map((link) => {
              // Services dropdown insertion logic
              // const isContact = link.name === 'Contact'

              const LinkElement = (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-3 py-2 transition-colors duration-200 ${
                    location.pathname === link.to
                      ? 'text-blue-600 font-bold'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.to && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                      initial={false}
                    />
                  )}
                </Link>
              )

              // We want to insert Services between Gallery and Departments
              if (link.name === 'Pharmacy') {
                return (
                  <div
                    key="services-nav-group"
                    className="flex items-center gap-4"
                  >
                    <div className="relative group">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        className={`relative px-3 py-2 flex items-center gap-1 transition-colors duration-200 ${
                          isServicesActive
                            ? 'text-blue-600 font-bold'
                            : 'text-gray-700 hover:text-blue-600'
                        }`}
                      >
                        Services
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                        {isServicesActive && (
                          <motion.div
                            layoutId="nav-underline"
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
                            initial={false}
                          />
                        )}
                      </button>

                      {isDropdownOpen && (
                        <ul
                          onMouseLeave={() => setIsDropdownOpen(false)}
                          className="absolute left-0 mt-0 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-2 overflow-hidden"
                        >
                          {serviceLinks.map((service) => (
                            <li key={service.slug}>
                              <Link
                                to="/services/$service"
                                params={{ service: service.slug }}
                                className="block px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-700 font-medium transition"
                                onClick={() => setIsDropdownOpen(false)}
                              >
                                {service.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    {LinkElement}
                  </div>
                )
              }

              return LinkElement
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed inset-0 top-0 bg-white z-40 overflow-y-auto pt-28"
            >
              <nav className="p-4 flex flex-col gap-2">
                <Link
                  to="/"
                  className={`px-4 py-3 text-lg border-b border-gray-50 rounded-lg ${
                    location.pathname === '/'
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`px-4 py-3 text-lg border-b border-gray-50 rounded-lg ${
                    location.pathname === '/about'
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/gallery"
                  className={`px-4 py-3 text-lg border-b border-gray-50 rounded-lg ${
                    location.pathname === '/gallery'
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Gallery
                </Link>

                {/* Mobile Services Dropdown */}
                <div>
                  <button
                    onClick={() =>
                      setIsMobileDropdownOpen(!isMobileDropdownOpen)
                    }
                    className={`w-full flex justify-between items-center px-4 py-3 text-lg border-b border-gray-50 rounded-lg ${
                      isServicesActive
                        ? 'bg-blue-50 text-blue-700 font-bold'
                        : 'text-gray-800'
                    }`}
                  >
                    Services
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${isMobileDropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isMobileDropdownOpen && (
                    <div className="bg-gray-50 rounded-lg mt-1 overflow-hidden">
                      {serviceLinks.map((service) => (
                        <Link
                          key={service.slug}
                          to="/services/$service"
                          params={{ service: service.slug }}
                          className="block px-8 py-3 text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 border-b border-white last:border-0"
                          onClick={() => setIsOpen(false)}
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <Link
                  to="/pharmacy"
                  className={`px-4 py-3 text-lg border-b border-gray-50 rounded-lg ${
                    location.pathname === '/pharmacy'
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Pharmacy
                </Link>


                <Link
                  to="/doctors"
                  className={`px-4 py-3 text-lg border-b border-gray-50 rounded-lg ${
                    location.pathname === '/doctors'
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Doctors
                </Link>
                <Link
                  to="/contact"
                  className={`px-4 py-3 text-lg rounded-lg ${
                    location.pathname === '/contact'
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

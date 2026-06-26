import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'
import {
  AlertCircle,
  ArrowUp,
  Briefcase,
  Building,
  Calendar,
  ChevronDown,
  Clock,
  FileText,
  Mail,
  Phone,
  Send,
  Sparkles,
  User,
} from 'lucide-react'
import { useCareerMutation } from './hooks/use-career-mutation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import SEO from '@/components/SEO'
import { apiClient } from '@/lib/axios'

const careerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z
    .string()
    .min(10, { message: 'Phone number must be at least 10 digits.' }),
  position: z.string().min(1, { message: 'Please select a position.' }),
  message: z.string().optional(),
})

interface JobPost {
  id: number
  title: string
  description: string
  is_active: boolean
  apply_duration: string | null
  created_at: string | null
}

const OTHER_VALUE = '__other__'

const RECENT_DAYS = 7

function isRecentPost(createdAt: string | null): boolean {
  if (!createdAt) return false
  const posted = new Date(createdAt).getTime()
  const now = Date.now()
  const diffMs = now - posted
  return diffMs >= 0 && diffMs < RECENT_DAYS * 24 * 60 * 60 * 1000
}

export default function CareerPage() {
  const formRef = useRef<HTMLDivElement>(null)
  const [resume, setResume] = useState<File | null>(null)
  const [resumeError, setResumeError] = useState<string | null>(null)
  const [isOtherPosition, setIsOtherPosition] = useState(false)
  const [expandedJobId, setExpandedJobId] = useState<number | null>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const { data: jobsData, isLoading: jobsLoading } = useQuery({
    queryKey: ['career-jobs'],
    queryFn: async () => {
      const { data } = await apiClient.get('/career/jobs')
      return data
    },
    refetchInterval: 60000,
  })

  const jobs: Array<JobPost> = jobsData?.data ?? []

  const mutation = useCareerMutation({
    onSuccess: () => {
      form.reset()
      setResume(null)
      setResumeError(null)
      setIsOtherPosition(false)
    },
  })

  const form = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      position: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      if (!resume) {
        setResumeError('Resume is required.')
        return
      }

      const formData = new FormData()
      formData.append('fullName', value.fullName)
      formData.append('email', value.email)
      formData.append('phone', value.phone)
      formData.append('position', value.position)
      if (value.message) formData.append('message', value.message)
      formData.append('resume', resume)

      await mutation.mutateAsync(formData)
    },
  })

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleJobClick = (jobTitle: string) => {
    setIsOtherPosition(false)
    form.setFieldValue('position', jobTitle)
    setTimeout(() => scrollToForm(), 100)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      if (file.type !== 'application/pdf') {
        setResume(null)
        setResumeError('Only PDF files are allowed.')
        e.target.value = ''
        return
      }
      if (file.size > 5 * 1024 * 1024) {
        setResume(null)
        setResumeError('Resume file size must be under 5MB.')
        e.target.value = ''
        return
      }
      setResume(file)
      setResumeError(null)
    } else {
      setResume(null)
      setResumeError(null)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      // Show the button once the user has scrolled past the hero section (~400px)
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      <SEO
        title="Careers"
        description="Join the team at Park Sonoscan Clinic. Explore current job openings and apply to become part of our dedicated healthcare family."
        canonicalUrl="/career"
      />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/images/career01.png"
              alt="Career at Park Clinic"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply" />
          </div>

          <div className="relative z-10 text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold text-white mb-4"
            >
              Career
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-blue-50 max-w-2xl mx-auto"
            >
              Join our team of dedicated healthcare professionals. We offer a
              dynamic environment where you can grow and make a difference.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8"
            >
              <Button
                onClick={scrollToForm}
                size="lg"
                className="rounded-full bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8"
              >
                Apply Now
              </Button>
            </motion.div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Jobs Section - Full Width */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Briefcase className="text-blue-600" />
              Current Openings
            </h2>

            {jobsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-slate-50 rounded-2xl p-6 border border-slate-100 animate-pulse"
                  >
                    <div className="h-5 w-3/4 bg-slate-200 rounded mb-3" />
                    <div className="h-3 w-1/2 bg-slate-200 rounded" />
                  </div>
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {jobs.map((job, index) => (
                  <motion.button
                    key={job.id}
                    type="button"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleJobClick(job.title)}
                    className="w-full text-left bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-md hover:border-blue-300 hover:bg-blue-50/30 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                        <Building size={20} className="text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2 flex-wrap">
                          {job.title}
                          {isRecentPost(job.created_at) && (
                            <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 font-medium animate-pulse">
                              <Sparkles size={11} />
                              New
                            </span>
                          )}
                        </h3>
                        <div className="relative">
                          <p
                            className={`text-sm text-slate-600 mt-2 leading-relaxed ${
                              expandedJobId !== job.id ? 'line-clamp-3' : ''
                            }`}
                          >
                            {job.description}
                          </p>
                          {job.description.length > 150 && (
                            <span
                              role="button"
                              tabIndex={0}
                              onClick={(e) => {
                                e.stopPropagation()
                                setExpandedJobId(
                                  expandedJobId === job.id ? null : job.id,
                                )
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  setExpandedJobId(
                                    expandedJobId === job.id ? null : job.id,
                                  )
                                }
                              }}
                              className="text-xs text-blue-600 hover:text-blue-800 font-medium mt-1 transition-colors cursor-pointer"
                            >
                              {expandedJobId === job.id
                                ? 'Show less ↑'
                                : 'Read more →'}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-4 text-xs text-slate-400">
                          {job.apply_duration && (
                            <span className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
                              <Calendar size={12} />
                              Apply by:{' '}
                              {new Date(
                                job.apply_duration,
                              ).toLocaleDateString()}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            Posted{' '}
                            {new Date(
                              job.created_at ?? '',
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity mt-2 font-medium flex items-center gap-1 shrink-0">
                        Apply for this position →
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center">
                <p className="text-slate-600 mb-4">
                  Explore exciting opportunities and grow your future with us.
                  New opportunities will be available soon.
                </p>
                <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  No Opening Available
                </div>
              </div>
            )}
          </section>

          {/* Visual Separator */}
          <motion.div
            className="relative mb-16"
            aria-hidden="true"
            initial={{ opacity: 0, scaleX: 0.5 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full border-t border-slate-100" />
            </div>
            <div className="relative flex justify-center">
              <motion.div
                className="bg-white px-3"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: 0.25, ease: 'backOut' }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-blue-200" />
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Section: Why Join Us + Form */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            >
              <section className="bg-blue-600 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Why Join Us?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-white/20 rounded-full p-1">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    </div>
                    <span>Modern healthcare environment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-white/20 rounded-full p-1">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    </div>
                    <span>Professional growth opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 bg-white/20 rounded-full p-1">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                      </svg>
                    </div>
                    <span>Supportive team culture</span>
                  </li>
                </ul>
              </section>
            </motion.div>

            <motion.div
              ref={formRef}
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
            >
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="bg-slate-900 px-8 py-6">
                  <h2 className="text-2xl font-bold text-white">
                    Apply Online
                  </h2>
                  <p className="text-slate-400 mt-1">
                    Join our growing healthcare team and become part of a modern
                    healthcare environment.
                  </p>
                </div>

                <div className="p-8">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      void form.handleSubmit()
                    }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <form.Field
                        name="fullName"
                        validators={{
                          onChange: careerSchema.shape.fullName,
                        }}
                        children={(field) => (
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              <User size={16} className="text-slate-400" /> Full
                              Name
                            </label>
                            <Input
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="Enter your full name"
                              className={`bg-slate-50 border-slate-200 focus:bg-white transition-all ${
                                field.state.meta.errors.length
                                  ? 'border-red-500'
                                  : ''
                              }`}
                            />
                            {field.state.meta.errors.length > 0 && (
                              <p className="text-red-500 text-xs flex items-center gap-1">
                                <AlertCircle size={12} />{' '}
                                {String(field.state.meta.errors[0])}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <form.Field
                        name="email"
                        validators={{
                          onChange: careerSchema.shape.email,
                        }}
                        children={(field) => (
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              <Mail size={16} className="text-slate-400" />{' '}
                              Email Address
                            </label>
                            <Input
                              type="email"
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="yourname@example.com"
                              className={`bg-slate-50 border-slate-200 focus:bg-white transition-all ${
                                field.state.meta.errors.length
                                  ? 'border-red-500'
                                  : ''
                              }`}
                            />
                            {field.state.meta.errors.length > 0 && (
                              <p className="text-red-500 text-xs flex items-center gap-1">
                                <AlertCircle size={12} />{' '}
                                {String(field.state.meta.errors[0])}
                              </p>
                            )}
                          </div>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <form.Field
                        name="phone"
                        validators={{
                          onChange: careerSchema.shape.phone,
                        }}
                        children={(field) => (
                          <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                              <Phone size={16} className="text-slate-400" />{' '}
                              Phone Number
                            </label>
                            <Input
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="e.g., +91 9876543210"
                              className={`bg-slate-50 border-slate-200 focus:bg-white transition-all ${
                                field.state.meta.errors.length
                                  ? 'border-red-500'
                                  : ''
                              }`}
                            />
                            {field.state.meta.errors.length > 0 && (
                              <p className="text-red-500 text-xs flex items-center gap-1">
                                <AlertCircle size={12} />{' '}
                                {String(field.state.meta.errors[0])}
                              </p>
                            )}
                          </div>
                        )}
                      />
                      <form.Field
                        name="position"
                        validators={{
                          onChange: careerSchema.shape.position,
                        }}
                        children={(field) => {
                          const handleSelectChange = (
                            e: React.ChangeEvent<HTMLSelectElement>,
                          ) => {
                            const val = e.target.value
                            if (val === OTHER_VALUE) {
                              setIsOtherPosition(true)
                              field.handleChange('')
                            } else {
                              setIsOtherPosition(false)
                              field.handleChange(val)
                            }
                          }

                          return (
                            <div className="space-y-2">
                              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                                <Briefcase
                                  size={16}
                                  className="text-slate-400"
                                />{' '}
                                Post Applied For
                              </label>
                              {isOtherPosition ? (
                                <div className="space-y-2">
                                  <div className="flex gap-2">
                                    <div className="relative flex-1">
                                      <Input
                                        name={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) =>
                                          field.handleChange(e.target.value)
                                        }
                                        placeholder="Enter the position title..."
                                        className={`bg-slate-50 border-slate-200 focus:bg-white transition-all ${
                                          field.state.meta.errors.length
                                            ? 'border-red-500'
                                            : ''
                                        }`}
                                        autoFocus
                                      />
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setIsOtherPosition(false)
                                        field.handleChange('')
                                      }}
                                      className="text-xs text-blue-600 hover:text-blue-800 underline underline-offset-2 shrink-0 whitespace-nowrap self-center"
                                    >
                                      Pick from list
                                    </button>
                                  </div>
                                </div>
                              ) : jobs.length > 0 ? (
                                <div className="relative">
                                  <select
                                    name={field.name}
                                    value={field.state.value}
                                    onBlur={field.handleBlur}
                                    onChange={handleSelectChange}
                                    className={`w-full h-10 rounded-lg border bg-slate-50 px-3 text-sm appearance-none cursor-pointer focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${
                                      field.state.meta.errors.length
                                        ? 'border-red-500'
                                        : field.state.value
                                          ? 'border-blue-300 text-slate-900'
                                          : 'border-slate-200 text-slate-400'
                                    }`}
                                  >
                                    <option value="" disabled>
                                      Select a position...
                                    </option>
                                    {jobs.map((job) => (
                                      <option
                                        key={job.id}
                                        value={job.title}
                                        className="text-slate-900"
                                      >
                                        {job.title}
                                      </option>
                                    ))}
                                    <option
                                      value={OTHER_VALUE}
                                      className="text-slate-500 italic"
                                    >
                                      ── Other (type your own) ──
                                    </option>
                                  </select>
                                  <ChevronDown
                                    size={16}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                                  />
                                </div>
                              ) : (
                                <Input
                                  name={field.name}
                                  value={field.state.value}
                                  onBlur={field.handleBlur}
                                  onChange={(e) =>
                                    field.handleChange(e.target.value)
                                  }
                                  placeholder="e.g., Staff Nurse, Lab Technician"
                                  className={`bg-slate-50 border-slate-200 focus:bg-white transition-all ${
                                    field.state.meta.errors.length
                                      ? 'border-red-500'
                                      : ''
                                  }`}
                                />
                              )}
                              {field.state.meta.errors.length > 0 && (
                                <p className="text-red-500 text-xs flex items-center gap-1">
                                  <AlertCircle size={12} />{' '}
                                  {String(field.state.meta.errors[0])}
                                </p>
                              )}
                            </div>
                          )
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <FileText size={16} className="text-slate-400" /> Upload
                        Resume (PDF Only)
                      </label>
                      <Input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className={`bg-slate-50 border-slate-200 focus:bg-white cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all ${
                          resumeError ? 'border-red-500' : ''
                        }`}
                      />
                      {resumeError && (
                        <p className="text-red-500 text-xs flex items-center gap-1">
                          <AlertCircle size={12} /> {resumeError}
                        </p>
                      )}
                    </div>

                    <form.Field
                      name="message"
                      children={(field) => (
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-slate-700">
                            Message / Cover Letter (Optional)
                          </label>
                          <Textarea
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            placeholder="Tell us a bit about yourself and why you'd like to join us."
                            className="min-h-[120px] bg-slate-50 border-slate-200 focus:bg-white transition-all"
                          />
                        </div>
                      )}
                    />

                    <form.Subscribe
                      selector={(state) => [
                        state.canSubmit,
                        state.isSubmitting,
                      ]}
                      children={([canSubmit, isSubmitting]) => (
                        <Button
                          type="submit"
                          disabled={!canSubmit || isSubmitting}
                          className="w-full h-12 text-base font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 shadow-md transition-all flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? (
                            'Submitting...'
                          ) : (
                            <>
                              <Send size={18} />
                              Submit Application
                            </>
                          )}
                        </Button>
                      )}
                    />
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: showScrollTop ? 1 : 0,
            y: showScrollTop ? 0 : 20,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl hover:scale-110 transition-all duration-200 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>
    </>
  )
}

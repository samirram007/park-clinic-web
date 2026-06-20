import React, { useState } from 'react'
import { Clock, Mail, MapPin, MessageSquare, Phone, PhoneCall, Send, } from 'lucide-react'
import GoogleMap from './google-map'
import { contactPageData as data } from '@/data/contact/contact.data'

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSubmitted(false), 3000)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="w-full overflow-x-hidden bg-slate-50">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{data.header.title} Us</h1>
          <p className="text-blue-100 text-xl max-w-2xl mx-auto leading-relaxed">
            We're here to provide the care and support you need. Reach out to us through any of the channels below.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-10 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Phone size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Emergency Contact</h3>
              <p className="text-blue-600 font-bold text-lg">+91 9775992022</p>
              <p className="text-slate-500 mt-1">Available 24/7 for emergencies</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Mail size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Email Support</h3>
              <p className="text-slate-600">{data.contactInfo.email.values[0]}</p>
              <p className="text-slate-500 mt-1">We'll respond within 24 hours</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center hover:shadow-md transition">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Working Hours</h3>
              <p className="text-slate-600">365 Days / 24 Hours</p>
              <p className="text-slate-500 mt-1">Admission facilities open always</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Form & Info */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-slate-100">

            {/* Contact Form */}
            <div className="lg:w-3/5 p-8 md:p-12 lg:p-16">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Contact Form</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{data.form.title}</h2>
              <p className="text-slate-500 text-lg mb-10">{data.form.description}</p>

              {submitted && (
                <div className="mb-8 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-3 animate-in fade-in zoom-in duration-300">
                  <div className="bg-green-500 text-white rounded-full p-1">
                    <Send size={16} />
                  </div>
                  <span className="font-medium">{data.form.successMessage}</span>
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">{data.form.labels.name}</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={onChange}
                      placeholder="Your Full Name"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">{data.form.labels.email}</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="your@email.com"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={onChange}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700"
                  >
                    <option value="">Select a subject</option>
                    <option value="appointment">General Inquiry</option>
                    <option value="appointment">Appointment Booking</option>
                    <option value="feedback">Patient Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">{data.form.labels.message}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={5}
                    placeholder="How can we help you?"
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none placeholder:text-slate-400"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
                >
                  {data.form.labels.submit}
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>

            {/* Side Information & Map */}
            <div className="lg:w-2/5 bg-slate-900 text-white p-8 md:p-12 lg:p-16 flex flex-col">
              <div className="mb-10">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
                  <MapPin className="text-blue-500" /> Location Details
                </h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-blue-400">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Address</p>
                      <p className="text-lg mt-1">{data.contactInfo.address.value}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-blue-400">
                      <PhoneCall size={20} />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Contact</p>
                      <p className="text-lg mt-1">+91 9775992022</p>
                      <p className="text-slate-300 text-sm">{data.contactInfo.email.values[0]}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-[300px] grayscale brightness-90 hover:grayscale-0 transition-all duration-500">
                <GoogleMap />
              </div>

              <div className="mt-8 p-6 bg-blue-600/20 border border-blue-500/20 rounded-2xl">
                <div className="flex items-start gap-4">
                  <MessageSquare className="text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-bold text-white">Need immediate help?</h4>
                    <p className="text-blue-100 text-sm mt-1 leading-relaxed">
                      Our support team is standing by to assist with any urgent clinical or administrative questions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ / Secondary Section (Optional Placeholder for Future) */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 inline-block px-12">
            <p className="text-slate-500">Want to book a direct appointment? <a href="/doctors" className="text-blue-600 font-bold hover:underline">Find a Doctor →</a></p>
          </div>
        </div>
      </section>
    </div>
  )
}

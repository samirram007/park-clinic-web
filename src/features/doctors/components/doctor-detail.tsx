import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from '@tanstack/react-router'
import {
  ArrowLeft,
  Calendar,
  Clock,
  GraduationCap,
  Loader2,
  Star,
  UserRound,
} from 'lucide-react'
import { doctorQueries } from '@/features/doctors/query-options'
import { getDoctorImageUrl } from '@/features/doctors/services/api'
import { parseSchedule } from '@/features/doctors/utils/schedule-utils'

export default function DoctorDetail() {
  const [imgError, setImgError] = useState(false)
  const { doctorId } = useParams({ from: '/_guest/doctors/$doctorId' })

  const { data: doctor, isLoading } = useQuery(
    doctorQueries.detail(Number(doctorId)),
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 flex flex-col items-center justify-center gap-4">
        <UserRound size={64} className="text-slate-300" />
        <h1 className="text-2xl font-bold text-slate-600">Doctor not found</h1>
        <Link to="/doctors" className="text-blue-600 hover:underline">
          Back to Doctors
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50">
      {/* Back Navigation */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <Link
          to="/doctors"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft size={16} />
          Back to all doctors
        </Link>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Hero Section */}
          <div className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 px-8 pt-16 pb-20 text-white">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
              {/* Avatar */}
              <div className="w-32 h-32 rounded-2xl overflow-hidden bg-white/20 ring-4 ring-white/30 shadow-xl shrink-0">
                {doctor.image && !imgError ? (
                  <img
                    src={getDoctorImageUrl(doctor.id)}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <UserRound size={48} className="text-white/70" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-center md:text-left">
                <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                  {doctor.type.length > 1 ? (
                    <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-gradient-to-r from-blue-500/40 to-amber-500/40 text-white ring-1 ring-white/30">
                      Consultant & Outdoor
                    </span>
                  ) : (
                    doctor.type.map((t) => (
                      <span
                        key={t}
                        className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                          t === 'consultant'
                            ? 'bg-white/20 text-white'
                            : 'bg-amber-400/30 text-amber-100'
                        }`}
                      >
                        {t}
                      </span>
                    ))
                  )}
                  {doctor.rating && (
                    <span className="flex items-center gap-1 text-sm bg-white/20 px-3 py-1 rounded-full">
                      <Star
                        size={14}
                        className="fill-yellow-300 text-yellow-300"
                      />
                      {doctor.rating}
                      {doctor.reviews && (
                        <span className="opacity-70">({doctor.reviews})</span>
                      )}
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold mb-1">
                  {doctor.name}
                </h1>
                <p className="text-blue-100 text-lg">
                  {doctor.title ?? doctor.department ?? 'Medical Specialist'}
                </p>
                {doctor.experience && (
                  <p className="text-blue-200 text-sm mt-1">
                    {doctor.experience} of experience
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Bio & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio */}
              {doctor.bio && (
                <section>
                  <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <UserRound size={18} className="text-blue-600" />
                    About
                  </h2>
                  <div className="bg-slate-50 rounded-xl p-5">
                    <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                      {doctor.bio}
                    </p>
                  </div>
                </section>
              )}

              {/* Education */}
              {doctor.education && (
                <section>
                  <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <GraduationCap size={18} className="text-blue-600" />
                    Education & Qualifications
                  </h2>
                  <div className="bg-slate-50 rounded-xl p-5">
                    <div className="space-y-2">
                      {doctor.education
                        .split('\n')
                        .map((line: string, i: number) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 shrink-0" />
                            <p className="text-slate-600">{line.trim()}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Department Info */}
              {doctor.department && (
                <section>
                  <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                    <UserRound size={18} className="text-blue-600" />
                    Department
                  </h2>
                  <div className="bg-slate-50 rounded-xl p-5">
                    <p className="text-slate-600">{doctor.department}</p>
                  </div>
                </section>
              )}
            </div>

            {/* Right Column - Schedule & Quick Info */}
            <div className="space-y-6">
              {/* Quick Info Card */}
              <div className="bg-slate-50 rounded-xl p-5 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider">
                  Quick Info
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Speciality</span>
                    <span className="font-medium text-slate-800">
                      {doctor.title ?? '—'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Experience</span>
                    <span className="font-medium text-slate-800">
                      {doctor.experience ?? '—'}
                    </span>
                  </div>
                  {doctor.rating && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Rating</span>
                      <span className="font-medium text-slate-800 flex items-center gap-1">
                        <Star
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                        {doctor.rating} / 5
                      </span>
                    </div>
                  )}
                  {doctor.reviews && (
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Reviews</span>
                      <span className="font-medium text-slate-800">
                        {doctor.reviews}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Type</span>
                    {doctor.type.length > 1 ? (
                      <span className="text-xs font-bold px-2 py-1 rounded-full uppercase bg-gradient-to-r from-blue-100 to-amber-100 text-slate-800 ring-1 ring-blue-200/50">
                        Consultant & Outdoor
                      </span>
                    ) : (
                      <div className="flex gap-1">
                        {doctor.type.map((t) => (
                          <span
                            key={t}
                            className={`text-xs font-bold px-2 py-1 rounded-full uppercase ${
                              t === 'consultant'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-amber-100 text-amber-700'
                            }`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Schedule Cards */}
              {doctor.schedule &&
                (() => {
                  const isDualType =
                    doctor.type.includes('consultant') &&
                    doctor.type.includes('outdoor')

                  if (!isDualType) {
                    // Single-type doctor: show schedule as-is with day:time parsing
                    return (
                      <div className="bg-slate-50 rounded-xl p-5">
                        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                          <Calendar size={16} className="text-blue-600" />
                          Schedule
                        </h3>
                        <div className="space-y-2">
                          {doctor.schedule
                            .split('\n')
                            .map((line: string, i: number) => {
                              const [day, ...timeParts] = line.split(':')
                              const time = timeParts.join(':').trim()
                              return (
                                <div
                                  key={i}
                                  className="flex items-start gap-3 text-sm"
                                >
                                  <Clock
                                    size={14}
                                    className="text-blue-500 mt-0.5 shrink-0"
                                  />
                                  <div>
                                    <span className="font-medium text-slate-700">
                                      {day}:
                                    </span>
                                    <span className="text-slate-500 ml-1">
                                      {time}
                                    </span>
                                  </div>
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    )
                  }

                  // Dual-type doctor: separate consultant and outdoor schedule sections
                  const parsed = parseSchedule(doctor.schedule)
                  const consultantSchedule = parsed.consultant
                    ? parsed.consultant.split('\n')
                    : []
                  const outdoorSchedule = parsed.outdoor
                    ? parsed.outdoor.split('\n')
                    : []
                  const generalSchedule = parsed.general
                    ? parsed.general.split('\n')
                    : []

                  return (
                    <>
                      {consultantSchedule.length > 0 && (
                        <div className="bg-blue-50/70 rounded-xl p-5 border-l-4 border-blue-500">
                          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <Calendar size={16} className="text-blue-600" />
                            Consultant Schedule
                          </h3>
                          <div className="space-y-2">
                            {consultantSchedule.map((content, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-3 text-sm"
                              >
                                <Clock
                                  size={14}
                                  className="text-blue-500 mt-0.5 shrink-0"
                                />
                                <span className="text-slate-600">
                                  {content}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {outdoorSchedule.length > 0 && (
                        <div className="bg-amber-50/70 rounded-xl p-5 border-l-4 border-amber-500">
                          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <Calendar size={16} className="text-amber-600" />
                            Outdoor Schedule
                          </h3>
                          <div className="space-y-2">
                            {outdoorSchedule.map((content, i) => (
                              <div
                                key={i}
                                className="flex items-start gap-3 text-sm"
                              >
                                <Clock
                                  size={14}
                                  className="text-amber-500 mt-0.5 shrink-0"
                                />
                                <span className="text-slate-600">
                                  {content}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {generalSchedule.length > 0 && (
                        <div className="bg-slate-50 rounded-xl p-5">
                          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <Calendar size={16} className="text-slate-600" />
                            General Schedule
                          </h3>
                          <div className="space-y-2">
                            {generalSchedule.map((line, i) => {
                              const [day, ...timeParts] = line.split(':')
                              const time = timeParts.join(':').trim()
                              return (
                                <div
                                  key={i}
                                  className="flex items-start gap-3 text-sm"
                                >
                                  <Clock
                                    size={14}
                                    className="text-slate-500 mt-0.5 shrink-0"
                                  />
                                  <div>
                                    <span className="font-medium text-slate-700">
                                      {day}:
                                    </span>
                                    <span className="text-slate-500 ml-1">
                                      {time}
                                    </span>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </>
                  )
                })()}

              {/* Action Button */}
              <button className="w-full py-4 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]">
                BOOK APPOINTMENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

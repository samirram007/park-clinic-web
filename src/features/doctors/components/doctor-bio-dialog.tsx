import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Loader2, UserRound, GraduationCap, Calendar, Clock, Star } from 'lucide-react'

import { doctorQueries } from '@/features/doctors/query-options'
import { parseSchedule } from '@/features/doctors/utils/schedule-utils'
import { getDoctorImageUrl } from '@/features/doctors/services/api'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface DoctorBioDialogProps {
  doctorId: number | null
  onClose: () => void
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
}

export const DoctorBioDialog = ({ doctorId, onClose }: DoctorBioDialogProps) => {
  const [imgError, setImgError] = useState(false)
  const { data: doctor, isLoading } = useQuery({
    ...doctorQueries.detail(doctorId ?? 0),
    enabled: !!doctorId,
  })

  // Reset image error state when dialog opens with a new doctor
  const handleClose = () => {
    setImgError(false)
    onClose()
  }

  return (
    <Dialog open={!!doctorId} onOpenChange={(open) => { if (!open) handleClose() }}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto p-0 gap-0" aria-label={doctor?.name ?? 'Doctor details'}>
        {/* Always present visually-hidden title for screen reader accessibility */}
        <DialogTitle className="sr-only">
          {doctor?.name ?? (isLoading ? 'Loading doctor details' : 'Doctor details')}
        </DialogTitle>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </motion.div>
          </div>
        ) : doctor ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header / Hero */}
            <motion.div
              variants={heroVariants}
              className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 px-6 pt-10 pb-8 text-white"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5">
                {/* Avatar */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                  className="w-24 h-24 rounded-xl overflow-hidden bg-white/20 ring-4 ring-white/30 shadow-xl shrink-0"
                >
                  {doctor.image && !imgError ? (
                    <img
                      src={getDoctorImageUrl(doctor.id)}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                      onError={() => setImgError(true)}
                    />
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="w-full h-full flex items-center justify-center">
                          <UserRound size={36} className="text-white/70" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        No image available
                      </TooltipContent>
                    </Tooltip>
                  )}
                </motion.div>

                {/* Info */}
                <div className="text-center sm:text-left flex-1 min-w-0">
                  <div className="flex items-center gap-2 justify-center sm:justify-start mb-1.5 flex-wrap">
                    {doctor.type.length > 1 ? (
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider bg-gradient-to-r from-blue-500/40 to-amber-500/40 text-white ring-1 ring-white/30">
                        Consultant & Outdoor
                      </span>
                    ) : (
                      doctor.type.map((t) => (
                        <span
                          key={t}
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
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
                      <span className="flex items-center gap-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                        <Star size={12} className="fill-yellow-300 text-yellow-300" />
                        {doctor.rating}
                      </span>
                    )}
                  </div>

                  <div className="text-center sm:text-left">
                    <h2 className="text-2xl font-bold text-white">
                      {doctor.name}
                    </h2>
                    <p className="text-blue-100 text-base">
                      {doctor.title ?? doctor.department ?? 'Medical Specialist'}
                    </p>
                  </div>

                  {doctor.experience && (
                    <p className="text-blue-200 text-sm mt-0.5">
                      {doctor.experience} of experience
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Quick Info Row */}
              <motion.div variants={itemVariants} className="flex flex-wrap gap-3 text-sm">
                {doctor.title && (
                  <div className="bg-slate-50 rounded-lg px-3 py-2">
                    <span className="text-slate-400 text-xs block">Speciality</span>
                    <span className="font-medium text-slate-800">{doctor.title}</span>
                  </div>
                )}
                {doctor.department && (
                  <div className="bg-slate-50 rounded-lg px-3 py-2">
                    <span className="text-slate-400 text-xs block">Department</span>
                    <span className="font-medium text-slate-800">{doctor.department}</span>
                  </div>
                )}
                {doctor.experience && (
                  <div className="bg-slate-50 rounded-lg px-3 py-2">
                    <span className="text-slate-400 text-xs block">Experience</span>
                    <span className="font-medium text-slate-800">{doctor.experience}</span>
                  </div>
                )}
                {doctor.rating && (
                  <div className="bg-slate-50 rounded-lg px-3 py-2">
                    <span className="text-slate-400 text-xs block">Rating</span>
                    <span className="font-medium text-slate-800 flex items-center gap-1">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      {doctor.rating} / 5
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Bio */}
              {doctor.bio && (
                <motion.section variants={itemVariants}>
                  <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <UserRound size={14} className="text-blue-600" />
                    About
                  </h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                      {doctor.bio}
                    </p>
                  </div>
                </motion.section>
              )}

              {/* Education */}
              {doctor.education && (
                <motion.section variants={itemVariants}>
                  <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <GraduationCap size={14} className="text-blue-600" />
                    Education & Qualifications
                  </h3>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <div className="space-y-1.5">
                      {doctor.education.split('\n').map((line, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                          <p className="text-slate-600 text-sm">{line.trim()}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.section>
              )}

              {/* Schedule */}
              {doctor.schedule && (
                <motion.section variants={itemVariants}>
                  <h3 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-1.5">
                    <Calendar size={14} className="text-blue-600" />
                    Schedule
                  </h3>
                  {(() => {
                    const isDualType =
                      doctor.type.includes('consultant') && doctor.type.includes('outdoor')

                    if (!isDualType) {
                      return (
                        <div className="bg-slate-50 rounded-lg p-4 space-y-1.5">
                          {doctor.schedule.split('\n').map((line, i) => {
                            const [day, ...timeParts] = line.split(':')
                            const time = timeParts.join(':').trim()
                            return (
                              <div key={i} className="flex items-start gap-2 text-sm">
                                <Clock size={13} className="text-blue-500 mt-0.5 shrink-0" />
                                <div>
                                  <span className="font-medium text-slate-700">{day}:</span>
                                  <span className="text-slate-500 ml-1">{time}</span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      )
                    }

                    const parsed = parseSchedule(doctor.schedule)
                    return (
                      <div className="space-y-3">
                        {parsed.consultant && (
                          <div className="bg-blue-50/70 rounded-lg p-4 border-l-4 border-blue-500">
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <Calendar size={12} className="text-blue-600" />
                              Consultant Schedule
                            </h4>
                            <div className="space-y-1">
                              {parsed.consultant.split('\n').map((line, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                  <Clock size={12} className="text-blue-500 mt-0.5 shrink-0" />
                                  <span className="text-slate-600">{line}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {parsed.outdoor && (
                          <div className="bg-amber-50/70 rounded-lg p-4 border-l-4 border-amber-500">
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                              <Calendar size={12} className="text-amber-600" />
                              Outdoor Schedule
                            </h4>
                            <div className="space-y-1">
                              {parsed.outdoor.split('\n').map((line, i) => (
                                <div key={i} className="flex items-start gap-2 text-sm">
                                  <Clock size={12} className="text-amber-500 mt-0.5 shrink-0" />
                                  <span className="text-slate-600">{line}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {parsed.general && (
                          <div className="bg-slate-50 rounded-lg p-4">
                            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">General</h4>
                            <div className="space-y-1">
                              {parsed.general.split('\n').map((line, i) => {
                                const [day, ...timeParts] = line.split(':')
                                const time = timeParts.join(':').trim()
                                return (
                                  <div key={i} className="flex items-start gap-2 text-sm">
                                    <Clock size={12} className="text-slate-500 mt-0.5 shrink-0" />
                                    <div>
                                      <span className="font-medium text-slate-700">{day}:</span>
                                      <span className="text-slate-500 ml-1">{time}</span>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })()}
                </motion.section>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-16 text-slate-400"
          >
            <UserRound size={48} className="mb-3 opacity-30" />
            <p className="text-lg font-medium">Doctor not found</p>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  )
}

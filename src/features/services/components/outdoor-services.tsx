import React, { useEffect, useRef, useState, useMemo } from 'react'
import { ChevronUp, Loader2, UserRound } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { doctorQueries } from '@/features/doctors/query-options'
import { DoctorBioDialog } from '@/features/doctors/components/doctor-bio-dialog'
import { DoctorSearchPanel } from '@/features/doctors/components/doctor-search-panel'

const OutdoorServices: React.FC = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('All')
  const gridRef = useRef<HTMLDivElement>(null)
  const isInitialRender = useRef(true)
  const { data: doctors, isLoading } = useQuery(doctorQueries.list('outdoor'))

  // Show "Back to top" button when scrolled past 300px
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Filter to only show doctors that include 'outdoor' in their type array
  const outdoorDoctors = (doctors ?? []).filter((d) =>
    d.type.includes('outdoor'),
  )

  // Get all departments
  const allDepartments = useMemo(() => {
    const deps = new Set(outdoorDoctors.map((d) => d.department || 'Other'))
    return Array.from(deps).sort()
  }, [outdoorDoctors])

  // Filter doctors by search query and department
  const filteredDoctors = useMemo(() => {
    return outdoorDoctors.filter((doctor) => {
      const matchesSearch =
        !searchQuery ||
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (doctor.education ?? '').toLowerCase().includes(searchQuery.toLowerCase())

      const matchesDepartment =
        selectedDepartment === 'All' ||
        (doctor.department || 'Other') === selectedDepartment

      return matchesSearch && matchesDepartment
    })
  }, [outdoorDoctors, searchQuery, selectedDepartment])

  // Group filtered doctors by department
  const groupedByDepartment = filteredDoctors.reduce<
    Array<{
      department: string
      doctors: Array<{ id: number; name: string; isDual: boolean; education: string | null }>
    }>
  >((acc, doctor) => {
    const dept = doctor.department || 'Other'
    const existing = acc.find((g) => g.department === dept)
    const entry = {
      id: doctor.id,
      name: doctor.name,
      isDual: doctor.type.length > 1,
      education: doctor.education,
    }
    if (existing) {
      existing.doctors.push(entry)
    } else {
      acc.push({ department: dept, doctors: [entry] })
    }
    return acc
  }, [])

  // Auto-scroll to results grid when filters change
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }
    if (gridRef.current && filteredDoctors.length > 0) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      window.scrollBy(0, -20)
    }
  }, [searchQuery, selectedDepartment])

  const departmentColors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-indigo-500 to-blue-500',
    'from-teal-500 to-green-500',
  ]

  const getColorClass = (index: number) =>
    departmentColors[index % departmentColors.length]

  if (isLoading) {
    return (
      <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 py-16 px-4 md:px-8 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </section>
    )
  }

  return (
    <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 py-16 px-4 md:px-8 min-h-screen">
      {/* Title */}
      <div className="text-center mb-8">
        <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-3">
          Outdoor Services
        </p>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 uppercase tracking-wide mb-2">
          Outdoor Doctor List
        </h1>
        <p className="text-slate-500 text-base font-semibold">
          Expert Specialists Available for Consultation
        </p>
        <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded"></div>
      </div>

      {/* Search Panel */}
      <DoctorSearchPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedDepartment={selectedDepartment}
        onDepartmentChange={setSelectedDepartment}
        departments={allDepartments}
        resultsCount={filteredDoctors.length}
        totalCount={outdoorDoctors.length}
      />

      {/* Grid */}
      <div ref={gridRef} className="scroll-mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
        {groupedByDepartment.length === 0 ? (
          <div className="col-span-full text-center py-16">
            <UserRound size={48} className="mx-auto mb-3 text-slate-300" />
            <p className="text-lg font-medium text-slate-400">No doctors match your search</p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('')
                setSelectedDepartment('All')
              }}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 underline underline-offset-2 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          groupedByDepartment.map((dept, deptIndex) => (
            <div
              key={dept.department}
              className="group h-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              {/* Department Header */}
              <div
                className={`bg-gradient-to-r ${getColorClass(deptIndex)} p-5 rounded-t-3xl`}
              >
                <h2 className="text-sm md:text-base font-extrabold text-white uppercase tracking-wider leading-tight">
                  {dept.department}
                </h2>
              </div>

              {/* Doctor List */}
              <div className="p-4 flex-1">
                {dept.doctors.map((doctor) => (
                  <button
                    key={doctor.id}
                    type="button"
                    onClick={() => setSelectedDoctorId(doctor.id)}
                    className="w-full text-left px-3 py-3 border-b border-slate-100 last:border-b-0 hover:bg-blue-50 hover:border-l-2 hover:border-l-blue-500 transition-all duration-200 group/link block cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <UserRound
                        size={16}
                        className="text-blue-500 shrink-0 mt-0.5 group-hover/link:text-blue-700"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="text-slate-700 text-xs md:text-sm leading-relaxed group-hover/link:text-blue-700">
                          {doctor.name}
                        </p>

                        {doctor.education && (
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-tight truncate">
                            {doctor.education}
                          </p>
                        )}
                      </div>

                      {doctor.isDual && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider bg-gradient-to-r from-blue-100 to-amber-100 text-slate-600 shrink-0 mt-0.5">
                          Both
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bio Dialog */}
      <DoctorBioDialog
        doctorId={selectedDoctorId}
        onClose={() => setSelectedDoctorId(null)}
      />

      {/* Back to top */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium"
          title="Back to top"
        >
          <ChevronUp size={16} />
          Back to top
        </button>
      )}
    </section>
  )
}

export default OutdoorServices

'use client'

import SEO from '@/components/SEO'
import { UserRound, Loader2 } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { doctorQueries } from '@/features/doctors/query-options';

const Doctors = () => {
  const { data: doctors, isLoading } = useQuery(doctorQueries.list('consultant'));

  // Filter to only show doctors that include 'consultant' in their type array
  // (the API already filters, but be safe with client-side data)
  const consultantDoctors = (doctors ?? []).filter(d => d.type.includes('consultant'));

  if (isLoading) {
    return (
      <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 py-16 px-4 md:px-8 min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </section>
    );
  }

  // Group doctors by their title (department), preserving type info
  const groupedDoctors = consultantDoctors.reduce<Record<string, { id: number; name: string; isDual: boolean }[]>>((acc, doctor) => {
    const dept = doctor.title || doctor.department || 'Other';
    if (!acc[dept]) {
      acc[dept] = [];
    }
    acc[dept].push({ id: doctor.id, name: doctor.name, isDual: doctor.type.length > 1 });
    return acc;
  }, {});

  const departmentList = Object.keys(groupedDoctors).map(dept => ({
    department: dept,
    doctors: groupedDoctors[dept]
  }));

  const departmentColors = [
    "from-blue-500 to-cyan-500",
    "from-purple-500 to-pink-500",
    "from-green-500 to-emerald-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-blue-500",
    "from-teal-500 to-green-500",
  ];

  const getColorClass = (index: number) => departmentColors[index % departmentColors.length];

  return (
    <>
      <SEO
        title="Our Doctors"
        description="Meet our team of experienced doctors and specialists at Park Sonoscan Clinic. Expert healthcare professionals dedicated to your well-being."
        canonicalUrl="/doctors"
      />
      <section className="bg-gradient-to-br from-blue-50 via-slate-50 to-cyan-50 py-16 px-4 md:px-8 min-h-screen">

      {/* Title */}
      <div className="text-center mb-12">
        <p className="text-blue-600 text-sm font-bold uppercase tracking-widest mb-3">Our Medical Team</p>
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-800 uppercase tracking-wide mb-2">
          Our Doctors
        </h1>
        <p className="text-slate-500 text-base font-semibold">Expert Specialists Dedicated to Your Health</p>
        <div className="h-1.5 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mt-6 rounded"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">

        {departmentList.map((dept, deptIndex) => (
          <div key={dept.department} className="group h-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300">

            {/* Department Header */}
            <div className={`bg-gradient-to-r ${getColorClass(deptIndex)} p-5 rounded-t-3xl`}>
              <h2 className="text-sm md:text-base font-extrabold text-white uppercase tracking-wider leading-tight">
                {dept.department}
              </h2>
            </div>

            {/* Doctor List */}
            <div className="p-4 flex-1">
              {dept.doctors.map((doctor: { id: number; name: string; isDual: boolean }) => (
                <Link
                  key={doctor.id}
                  to="/doctors/$doctorId"
                  params={{ doctorId: String(doctor.id) }}
                  className="flex items-start gap-2 px-3 py-3 border-b border-slate-100 last:border-b-0 hover:bg-blue-50 hover:border-l-2 hover:border-l-blue-500 transition-all duration-200 group/link"
                >
                  <UserRound
                    size={16}
                    className="text-blue-500 shrink-0 mt-0.5 group-hover/link:text-blue-700"
                  />

                  <p className="text-slate-700 text-xs md:text-sm leading-relaxed group-hover/link:text-blue-700 flex-1">
                    {doctor.name}
                  </p>

                  {doctor.isDual && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider bg-gradient-to-r from-blue-100 to-amber-100 text-slate-600 shrink-0">
                      Both
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
    </>
  );
};

export default Doctors;

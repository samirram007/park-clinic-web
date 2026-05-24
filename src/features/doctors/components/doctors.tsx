'use client'

import { UserRound } from "lucide-react";
import { doctorsPageData } from '@/data/doctors/doctors-page.data';

const Doctors = () => {
    const { doctors } = doctorsPageData;

    // Group doctors by their title (department)
    const groupedDoctors = doctors.reduce((acc: Record<string, string[]>, doctor) => {
        const dept = doctor.title;
        if (!acc[dept]) {
            acc[dept] = [];
        }
        acc[dept].push(doctor.name);
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
                            {dept.doctors.map((doctor: string, index: number) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-2 px-3 py-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors duration-200"
                                >
                                    <UserRound
                                        size={16}
                                        className="text-blue-500 shrink-0 mt-0.5"
                                    />

                                    <p className="text-slate-700 text-xs md:text-sm leading-relaxed">
                                        {doctor}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Doctors;

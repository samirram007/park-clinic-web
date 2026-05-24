import { useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Search } from 'lucide-react';

import { doctorsPageData } from '@/data/doctors/doctors-page.data';
import type { Doctor } from '@/data/doctors/doctor';

const containerVariants = {
  hidden: { opacity: 0 },

  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },

  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },

  hover: {
    y: -10,
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
} satisfies Variants;

export function DoctorsPage() {
  const [filter, setFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    ...Array.from(
      new Set(
        doctorsPageData.doctors.map(
          (doctor: Doctor) => doctor.title
        )
      )
    ),
  ];

  const filteredDoctors = doctorsPageData.doctors.filter(
    (doctor: Doctor) => {
      const matchesCategory =
        filter === 'All' || doctor.title === filter;

      const matchesSearch = doctor.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    }
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-20 px-6 flex flex-col items-center">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl text-center mb-12 w-full"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight uppercase italic">
          {doctorsPageData.header.title}
        </h1>

        <div className="w-24 h-1 bg-blue-700 mx-auto mb-8 rounded-full" />

        <p className="text-lg text-slate-500 font-medium leading-relaxed">
          {doctorsPageData.header.description}
        </p>
      </motion.div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              filter === cat
                ? 'bg-blue-700 text-white shadow-md'
                : 'bg-white text-slate-500 hover:text-blue-700 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full max-w-xl mb-16 relative group"
      >
        <input
          type="text"
          placeholder="Find a specialist..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-14 pr-6 py-4 rounded-2xl border border-slate-200 bg-white focus:outline-none focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600 transition-all duration-300 shadow-sm text-slate-700 placeholder:text-slate-400"
        />

        <Search
          size={22}
          className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-700 transition-colors"
        />
      </motion.div>

      {/* Doctors Grid */}
      <motion.div
        layout
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-20"
      >
        <AnimatePresence mode="popLayout">
          {filteredDoctors.map((doctor: Doctor) => (
            <motion.div
              key={doctor.id}
              layout
              variants={cardVariants}
              whileHover="hover"
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-[2.5rem] p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center group"
            >
              <div className="w-full h-80 rounded-[2rem] overflow-hidden mb-6 relative">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />

                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-blue-800 shadow-sm border border-white/20">
                  ⭐ {doctor.rating}
                </div>
              </div>

              <div className="px-4 pb-6 w-full">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-[0.15em] mb-2 block">
                  {doctor.title}
                </span>

                <h3 className="text-lg font-bold text-slate-900 mb-1 truncate group-hover:text-blue-700 transition-colors">
                  {doctor.name}
                </h3>

                <p className="text-slate-400 text-xs mb-8 font-medium uppercase tracking-wider">
                  {doctor.experience} Experience
                </p>

                <button className="w-full py-4 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-blue-700 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-900/20 active:scale-[0.98]">
                  BOOK APPOINTMENT
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
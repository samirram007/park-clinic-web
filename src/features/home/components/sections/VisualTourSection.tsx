import { motion } from 'framer-motion'
import { Link } from '@tanstack/react-router'
import { ImageIcon, ArrowRight } from 'lucide-react'
import { visualTourData as data } from '@/data/home/visual-tour-section.data'

export default function VisualTourSection() {
  return (
    <section className="bg-slate-50 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
              <ImageIcon size={16} />
              {data.tag}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {data.title}
            </h2>
            <p className="text-slate-600 text-lg">
              {data.description}
            </p>
          </div>
          <Link 
            to={data.cta.link as any}
            className="group inline-flex items-center gap-2 text-blue-600 font-bold text-lg hover:text-blue-700 transition"
          >
            {data.cta.text}
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-sm aspect-4/3"
            >
              <img 
                src={image.src} 
                alt={image.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">{image.category}</span>
                <h3 className="text-white font-bold mt-1">{image.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 bg-blue-600 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <ImageIcon size={120} />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                    <h3 className="text-3xl font-bold mb-2">Want to see more of our hospital?</h3>
                    <p className="text-blue-100 text-lg">Experience our commitment to healthcare through our full visual gallery.</p>
                </div>
                <Link 
                    to={data.cta.link as any}
                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg shrink-0"
                >
                    Visit Full Gallery
                </Link>
            </div>
        </div>
      </div>
    </section>
  )
}

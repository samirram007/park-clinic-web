import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageIcon, Maximize2, X } from "lucide-react";

const images = [
    { 
        src: "/images/ser1.png", 
        title: "ICU", 
        category: "Departments",
        description: "Park Sonoscan Services."
    },
     { 
        src: "/images/ser2.png", 
        title: "Neurosurgery OT", 
        category: "Departments",
        description: "Park Sonoscan Services."
    },
      { 
        src: "/images/ser3.png", 
        title: "Park Sonoscan Services", 
        category: "Departments",
        description: "services related pictures."
    },
      { 
        src: "/images/ser4.png", 
        title: "Neurosurgery OT", 
        category: "Departments",
        description: "Park Sonoscan Services."
    },
      { 
        src: "/images/ser-5.png", 
        title: "Orthopaedic Surgery", 
        category: "Departments",
        description: "Park Sonoscan Services."
    },
    { 
        src: "/images/ser6.png", 
        title: "CT Scan", 
        category: "Departments",
        description: "Park Sonoscan Services."
    },
      { 
        src: "/images/ser7.png", 
        title: "MRI", 
        category: "Departments",
        description: "Park Sonoscan Services."
    },
      { 
        src: "/images/ser8.png", 
        title: "Ultrasonography", 
        category: "Departments",
        description: "Park Sonoscan Services."
    },
      { 
        src: "/images/ser9.png", 
        title: "Emergency", 
        category: "Departments",
        description: "Park Sonoscan Services."
    },
    { 
        src: "/images/buil1.png", 
        title: "Medicine Counter at First Floor & Ground Floor", 
        category: "Building",
        description: "Building Pictures."
    },
    { 
        src: "/images/buil2.png", 
        title: "Reception at First Floor", 
        category: "Building",
        description: "Building Pictures."
    },
  { 
        src: "/images/buil3.png", 
        title: "Enquiry at Ground Floor", 
        category: "Building",
        description: "Building Pictures."
    },
   { 
        src: "/images/buil4.png", 
        title: "Waiting Lounge at First Floor", 
        category: "Building",
        description: "Building Pictures."
    },
   { 
        src: "/images/buil5.png", 
        title: "Main Enterance", 
        category: "Building",
        description: "Building Pictures."
    },
   { 
        src: "/images/buil6.png", 
        title: "General Ward", 
        category: "Building",
        description: "Building Pictures."
    },
 { 
        src: "/images/buil7.png", 
        title: "Corridor at Paediatric Unit", 
        category: "Building",
        description: "Building Pictures."
    },
  { 
        src: "/images/buil8.png", 
        title: "Corridor at General Ward", 
        category: "Building",
        description: "Building Pictures."
    },
  { 
        src: "/images/buil9.png", 
        title: "Outdoor Reception at 6th Floor", 
        category: "Building",
        description: "Building Pictures."
    },
    { 
        src: "/images/buil10.png", 
        title: "Waiting Area for Outdoor Patients", 
        category: "Building",
        description: "Building Pictures."
    },
    { 
        src: "/images/buil11.png", 
        title: "OOperation Theatre at Fifth Floor", 
        category: "Building",
        description: "Building Pictures."
    },
    { 
        src: "/images/buil12.png", 
        title: "Conference Hall at Sixth Floor", 
        category: "Building",
        description: "Building Pictures."
    },
    { 
        src: "/images/buil13.png", 
        title: "Conference Hall at Sixth Floor", 
        category: "Building",
        description: "Building Pictures."
    },
        { 
        src: "/images/oth1.png", 
        title: "CME", 
        category: "Others",
        description: "Moments of Connetion."
    },
            { 
        src: "/images/oth2.png", 
        title: "Cultural Programme", 
        category: "Others",
        description: "Moments of Connetion."
    },
            { 
        src: "/images/oth3.png", 
        title: "CME", 
        category: "Others",
        description: "Moments of Connetion."
    },
            { 
        src: "/images/oth4.png", 
        title: "CME", 
        category: "Others",
        description: "Moments of Connetion."
    },
            { 
        src: "/images/oth5.png", 
        title: "Birthday Celebration", 
        category: "Others",
        description: "Moments of Connetion."
    },
            { 
        src: "/images/oth6.png", 
        title: "CME", 
        category: "Others",
        description: "Moments of Connetion."
    },
            { 
        src: "/images/oth7.png", 
        title: "BIrthday Celebration", 
        category: "Others",
        description: "Moments of Connetion."
    },
            { 
        src: "/images/oth8.png", 
        title: "BIrthday Celebration", 
        category: "Others",
        description: "Moments of Connetion."
    },
];

export default function Gallery() {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [filter, setFilter] = useState("All");

    const categories = ["All", ...new Set(images.map(img => img.category))];
    const filteredImages = filter === "All" ? images : images.filter(img => img.category === filter);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedIndex((prev) => (prev !== null ? (prev + 1) % filteredImages.length : null));
    }, [filteredImages.length]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setSelectedIndex((prev) => (prev !== null ? (prev - 1 + filteredImages.length) % filteredImages.length : null));
    }, [filteredImages.length]);

    const handleClose = useCallback(() => {
        setSelectedIndex(null);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, handleNext, handlePrev, handleClose]);

    return (
        <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-bold uppercase tracking-wider mb-4">
                        <ImageIcon size={16} />
                        Visual Tour
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Gallery</h1>
                    <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Explore our state-of-the-art facilities, advanced medical technology, and the dedicated team behind our excellence in healthcare.
                    </p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Masonry-style Grid */}
                <motion.div
                    layout
                    className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredImages.map((img, index) => (
                            <motion.div
                                key={img.src}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.4 }}
                                className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl bg-slate-200 shadow-sm hover:shadow-xl transition-all duration-500"
                                onClick={() => setSelectedIndex(index)}
                            >
                                <img
                                    src={img.src}
                                    alt={img.title}
                                    className="w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    loading="lazy"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <span className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">{img.category}</span>
                                        <h3 className="text-white text-lg font-bold mt-0.5">{img.title}</h3>
                                        <p className="text-slate-200 text-xs mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-300">
                                            {img.description}
                                        </p>
                                        <div className="mt-4 flex items-center text-white/60 text-[10px] uppercase tracking-wider font-bold">
                                            <Maximize2 size={12} className="mr-1.5" />
                                            Open Gallery
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedIndex !== null && (
                    <motion.div
                        className="fixed inset-0 bg-slate-950/95 flex items-center justify-center z-[100] p-4 backdrop-blur-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                    >
                        <div className="relative w-full h-full flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
                            {/* Controls */}
                            <button
                                type="button"
                                onClick={handleClose}
                                className="absolute top-4 right-4 z-50 h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition flex items-center justify-center backdrop-blur-md border border-white/10"
                                aria-label="Close"
                            >
                                <X size={28} />
                            </button>

                            <button
                                type="button"
                                onClick={handlePrev}
                                className="absolute left-4 md:left-8 z-50 h-14 w-14 rounded-full bg-white/10 text-white hover:bg-white/20 transition flex items-center justify-center backdrop-blur-md border border-white/10 group"
                                aria-label="Previous"
                            >
                                <ChevronLeft size={36} className="group-hover:-translate-x-1 transition-transform" />
                            </button>

                            <button
                                type="button"
                                onClick={handleNext}
                                className="absolute right-4 md:right-8 z-50 h-14 w-14 rounded-full bg-white/10 text-white hover:bg-white/20 transition flex items-center justify-center backdrop-blur-md border border-white/10 group"
                                aria-label="Next"
                            >
                                <ChevronRight size={36} className="group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* Image Container */}
                            <div className="relative w-full max-w-5xl h-[70vh] flex flex-col items-center">
                                <motion.img
                                    key={filteredImages[selectedIndex].src}
                                    src={filteredImages[selectedIndex].src}
                                    alt=""
                                    className="w-full h-full object-contain rounded-lg shadow-2xl"
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                />

                                {/* Info Panel */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-8 text-center max-w-2xl px-4"
                                >
                                    <span className="text-blue-400 text-sm font-bold uppercase tracking-widest">
                                        {filteredImages[selectedIndex].category}
                                    </span>
                                    <h2 className="text-white text-2xl font-bold mt-2">
                                        {filteredImages[selectedIndex].title}
                                    </h2>
                                    <p className="text-slate-300 mt-3 text-lg leading-relaxed">
                                        {filteredImages[selectedIndex].description}
                                    </p>
                                    <div className="mt-6 text-white/50 text-sm bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/5 inline-block">
                                        {selectedIndex + 1} / {filteredImages.length}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

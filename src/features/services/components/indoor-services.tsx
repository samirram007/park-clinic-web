import React from "react";
import {
    Microscope,
    ScanLine,
    HeartPulse,
    Activity,
    Stethoscope,
    Brain,
} from "lucide-react";

const indoorServicesData = [
    {
        id: 1,
        title: "General Medicine",
        icon: Stethoscope,
        image:"/images/medi1.jpeg",
            
        tagline: "Excellence in Internal Medicine",
        description:
            "Multi-disciplinary outpatient consultation services with experienced physicians and specialists.",
        highlights: [
            "Fever Treatment",
            "Chronic Disease Care",
            "Hypertension Care",
        ],
        features: [
            "Doctor Consultation",
            "Health Checkup",
            "Preventive Medicine",
            "Diabetes Care",
            "Hypertension Care",
            "General OPD",
        ],
    },
    {
        id: 6,
        title: "Critical Care",
        icon: Activity,
        image:"/images/icu1.jpeg",
        tagline: "24×7 Advanced Intensive Care Support",
        description:
            "Affordable full body health checkup packages designed for early detection and preventive healthcare.",
        highlights: [
            "Life Support",
            "Trauma Support",
            "24×7 Monitoring",
        ],
        features: [
            "Multidisciplinary Critical Care Team",
            "Round-the-Clock Specialist Supervision",
            "High Dependency Unit (HDU) Facilities",
            "Central Oxygen & Suction System",
            "Post-Operative Critical Care Management",
            "Preventive Screening",
        ],
    },
    {
        id: 3,
        title: "Paediatric Surgery With NICU & PICU",
        icon: HeartPulse,
        image:"/images/paed1.jpeg",
        tagline: "Advanced Paediatrics & Child Wellness Care",
        description:
            'Merging with the Park Childrens Centre in 2009, this department provides "subsidised yet superior" care for newborns and children.',
        highlights: [
            "NICU",
            "PICU",
            "Neonatal Care",
           
        ],
        features: [
            "Treatments & OTs: Dedicated Pediatric Operation Theatres handle surgeries for congenital anomalies, paediatric urology, and neonatal emergencies.",
            "Facilities: The Anubha Memorial Neonatal Ward features advanced neonatal ventilators and a specialized NICU/PICU for critical paediatric care.",
           
        ],
    },
      {
        id: 4,
        title: "General Surgery, Laparoscopic Surgery & Urosurgery",
        icon: Brain,
        image:"/images/lapsur1.jpeg",
            
        tagline: "Advanced Surgical & Urological Care",
        description:
            "Offering minimally invasive surgical procedures for both simple and complex conditions of the abdomen and pelvic area, the laparoscopic services offered at Park Sonoscan Clinic are both diagnostic and therapeutic. ",
        highlights: [
            "Expert Surgeons",
            "Advanced Laparoscopy",
            "Kidney & Bladder Care",
        ],
        features: [
            "The hospital utilizes minimally invasive techniques to reduce post-operative pain and recovery time.",
            "Treatments: Laparoscopic cholecystectomy, hernia repairs, and advanced urological procedures like TURP and kidney stone removal.",
            
        ],
    },
     {
        id: 2,
        title: "Orthopaedics & Spine Surgery",
        icon: ScanLine,
        image:"/images/ortho1.png",
        tagline: "Advanced Bone & Spine Care",
        description:
            "The orthopaedic department focuses on restorative surgeries and advanced spine care.",
        highlights: [
            "Joint Care",
            "Fracture Management",
            "Sports Injury Care",
            
        ],
        features: [
            "Treatments & OTs: Specialized in Joint Replacements (Knee and Hip), Arthroscopy, and complex trauma management. The Park Spine Centre is a dedicated wing for spondylitis, spinal deformities, and disc surgeries.",
            "Patient Satisfaction: High success rates in spine surgeries have made it a preferred center for Kolkata Traffic Police and other professional groups requiring high physical mobility.",
           
        ],
    },
    {
        id: 5,
        title: "Neurosurgery",
        icon: Microscope,
        image:"/images/neuro1.png",
        tagline: "Brain & Spine Surgery (Neurosciences)",
        description:
            "Park Clinic is a recognised leader in neurosciences, boasting one of the most advanced neurosurgical setups in the region. State of the art 5 nos Operation Theater equipped with Neuronavigation, The most Advanced and robotic operating microscope,Intraoperative Ultrasound",
        highlights: [
            "Brain Surgery",
            "Spine Surgery",
            "Stroke Management",
           
        ],
        features: [
            "Treatments & OTs: The department is equipped with 5 dedicated neurosurgical operating theatres. It was among the first in the country to utilise Intraoperative Neuronavigation and Neuroendoscopy. Surgeons perform high-precision procedures for brain tumours, neurovascular disorders, and paediatric neurosurgery.",
            "Post-Operative Care: A specialized Neuro-HDU (High Dependency Unit) and ITU ensure 24/7 monitoring by a three-tier medical team.",
            
        ],
    },

   

    

  

    

    
];

const IndoorServices: React.FC = () => {
    return (
        <section className="bg-slate-50 py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="text-center mb-14">
                    <p className="text-blue-600 font-semibold uppercase tracking-[3px]">
                        Park Clinic
                    </p>

                    <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mt-3">
                        Indoor Services
                    </h1>

                    <p className="text-slate-600 mt-5 max-w-3xl mx-auto leading-relaxed">
                        PARK CLINIC provides advanced diagnostic, imaging and
                        multi-speciality healthcare services with experienced
                        doctors and modern technologies under one roof.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                    {indoorServicesData.map((service) => {
                        const Icon = service.icon;

                        return (
                            <div
                                key={service.id}
                                className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition duration-300 border border-slate-100"
                            >
                                {/* Image */}
                                <div className="relative h-60 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover hover:scale-105 transition duration-500"
                                    />

                                    <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow">
                                        <Icon
                                            size={28}
                                            className="text-blue-700"
                                        />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="text-sm text-blue-600 font-semibold uppercase tracking-wide text-justify">
                                        {service.tagline}
                                    </p>

                                    <h2 className="text-2xl font-bold text-slate-800 mt-2">
                                        {service.title}
                                    </h2>

                                    <p className="text-slate-600 mt-4 leading-relaxed text-justify">
                                        {service.description}
                                    </p>

                                    {/* Highlights */}
                                    <div className="flex flex-wrap gap-2 mt-5">
                                        {service.highlights.map((item) => (
                                            <span
                                                key={item}
                                                className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-700"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Features */}
                                    <div className="mt-6 space-y-3">
                                        {service.features.map((feature) => (
                                            <div
                                                key={feature}
                                                className="flex items-start gap-3 text-slate-700"
                                            >
                                                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex-shrink-0 mt-1.5 shadow" />

                                                <p className="text-sm text-justify">
                                                    {feature}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Button */}
                                    <button className="hidden mt-8 w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold transition">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default IndoorServices;
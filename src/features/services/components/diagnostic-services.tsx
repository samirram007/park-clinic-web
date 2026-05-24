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
        title: "NABL Accredited Pathology Laboratory",
        icon: Microscope,
        image:"/images/path1.jpeg",
        tagline: "Quality Diagnostics with NABL Excellence",
        description:
            "Our NABL-accredited laboratory ensures accurate, reliable, and high-quality diagnostic testing with advanced technology and expert care.",
        highlights: [
            "Haematology",
            "Biochemistry",
            "Histopathology",
            "Microbiology",
        ],
        features: [
            "Wide range of routine as well as special tests done.",
            "Wide range of routine as well as special tests dones.",
            "Entire panel of routine as well as special tests done..",
            "Immunofluorescence tests for autoimmune markers.",
        ],
    },

    {
        id: 2,
        title: "1.5 tesla MRI",
        icon: ScanLine,
        image:"/images/mri1.jpeg",
        tagline: "Advanced MRI Imaging with Precision & Care",
        description:
            "State-of-the-art MRI technology delivering detailed and accurate diagnostic imaging for better patient care.",
        highlights: [
            "Brain",
            "Spine",
            "Chest",
            "Abdomen",
        ],
        features: [
            "Quiet Suite.",
            "Dedicated Shoulder, Knee & Breast coils.:",
            "Diffusion Tensor Imaging.",
            "Head, Neck & Renal Angiography without contrast.",
           
        ],
    },

    {
        id: 3,
        title: "C.T. Scan",
        icon: HeartPulse,
        image:"/images/ctscan1.jpeg",
        tagline: "Advanced CT Scan for Precise Detection",
        description:
            'Advanced CT Scan services providing fast, detailed, and accurate imaging for precise diagnosis and effective treatment planning.',
        highlights: [
            "Brain",
            "Chest",
            "Abdomen",
            "Vessels",
        ],
        features: [
            "High Resolution Scanner- More diagnostic information than conventional CT scanner for most accurate diagnosis.",
            "High Detector Coverage- Very Fast Scanning, helps to scan patients with less breath holding capacity.",
            "Ultra Low Dose CT Scanner- Least Radiation Dose to Patient.",
           
        ],
    },

    {
        id: 4,
        title: "Digital X-Ray",
        icon: Brain,
        image:"/images/xray1.jpeg",
            
        tagline: "Modern X-Ray Technology for Better Diagnosis",
        description:
            "State-of-the-art digital imaging technology ensuring high-quality X-Ray diagnostics with reduced radiation exposure.",
        highlights: [
            "Routine X-Ray",
            "Special X-Ray",
        ],
        features: [
            "powerful picture tube executes more tissue penetration and producespicture-009 better image with minimum radiation hazard.",
            "Digital X-Ray is an improved version over conventional Radiography. Unmatched image quality.",
            "Lesions liable to be missed on conventional X-Ray are likely to be detected on Digital X-Ray.",
            
        ],
    },

    {
        id: 5,
        title: "Highend 4D Ultrasonography",
        icon: Stethoscope,
        image:"/images/usg1.jpeg",
            
        tagline: "High-Quality Ultrasound, Trusted Results",
        description:
            "Engineered for efficiency and reliability, and powered by international standard equipments which provide outstanding image quality, advanced features, and improved usability..",
        highlights: [
            "Abdominal",
            "Obstetrics & Gynaecological",
            "Small Part",
        ],
        features: [
            "Real-time moving images for detailed visualization",
            "Advanced imaging with enhanced clarity and precision",
            "Better assessment of organs, tissues, and blood flow",
            
        ],
    },

    {
        id: 6,
        title: "Cardiology",
        icon: Activity,
        image:"/images/ecg1.jpeg",
        tagline: "Committed to Better Heart Health",
        description:
            "Comprehensive cardiology services providing advanced diagnosis, treatment, and preventive care for heart health.",
        highlights: [
            "ECG",
            "Echocardiography",
            "Colour Doppler",
        ],
        features: [
            "Advanced cardiac monitoring and evaluation",
            "Expert consultation by experienced cardiologists",
            "Patient-centered care with modern diagnostic technology",
          
        ],
    },
    {
        id: 7,
        title: "E.E.G",
        icon: Activity,
        image:"/images/neurology1.jpeg",
        tagline: "Accurate EEG Diagnostics for Better Neurological Care",
        description:
            "Advanced EEG services providing accurate monitoring and analysis of brain activity for neurological diagnosis and care.",
        highlights: [
            "Non-invasive",
            "Safe",
            "Painless",
        ],
        features: [
            "Accurate diagnosis of neurological disorders",
            "Expert evaluation by experienced specialists",
            "Detection and monitoring of epilepsy and seizure disorders",
          
        ],
    },
        {
        id: 8,
        title: "Neurology",
        icon: Activity,
        image:"/images/emgncv1.jpeg",
        tagline: "Advanced Care for Brain, Spine & Nerves",
        description:
            "Specialized neuro care providing precise evaluation and personalized treatment for neurological conditions",
        highlights: [
            "E.M.G",
            "N.C.V",
            "V.E.P & Beraq",
        ],
        features: [
            "Accurate diagnosis of neurological disorders",
            "Expert evaluation by experienced specialists",
            "Detection and monitoring of epilepsy and seizure disorders",
          
        ],
    },
            {
        id: 9,
        title: "Physiotherapy",
        icon: Activity,
        image:"/images/physith1.jpeg",
        tagline: "Advanced Care for Pain & Recovery",
        description:
            "Specialized neuro care providing precise evaluation and personalized treatment for neurological conditions",
        highlights: [
            "Spine & Back Pain",
            "Sports Injury",
            "Pain Management",
        ],
        features: [
            "Improves mobility, flexibility, and movement",
            "Strengthens muscles and improves posture",
            "Enhances balance and coordination",
          
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
                    Diagnostic Services
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
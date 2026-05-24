import {
    Pill,
    Clock3,
    ShieldCheck,
    Truck,
    Phone,
    BadgeCheck,
} from "lucide-react";

const pharmacyServices = [
    {
        title: "24x7 Medicine Availability",
        description:
            "All essential medicines and healthcare products available round the clock.",
        icon: Clock3,
    },
    {
        title: "Certified Medicines",
        description:
            "Authentic medicines from trusted pharmaceutical brands and suppliers.",
        icon: ShieldCheck,
    },
    {
        title: "Home Delivery",
        description:
            "Fast and reliable medicine delivery service at your doorstep.",
        icon: Truck,
    },
    {
        title: "Prescription Support",
        description:
            "Experienced pharmacists to assist with prescriptions and dosage guidance.",
        icon: BadgeCheck,
    },
];

const medicineCategories = [
    "General Medicines",
    "Cardiac Medicines",
    "Diabetic Care",
    "Surgical Items",
    "Baby Care Products",
    "Health Supplements",
    "Personal Care",
    "OTC Medicines",
];

export default function PharmacyComponent() {
    return (
        <section className="bg-slate-50">

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-cyan-700 text-white">
                <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-sm">
                            <Pill size={18} />
                            Trusted Pharmacy Service
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mt-6 leading-tight">
                            24×7 Hospital
                            <span className="text-yellow-300"> Pharmacy</span>
                        </h1>

                        <p className="mt-6 text-lg text-blue-100 leading-relaxed">
                            Complete pharmacy support with genuine medicines,
                            healthcare essentials and professional pharmacist
                            assistance for all your medical needs.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <button className="bg-yellow-400 hover:bg-yellow-300 text-black px-7 py-3 rounded-xl font-semibold transition">
                                Order Medicines
                            </button>

                            <button className="border border-white hover:bg-white hover:text-blue-900 px-7 py-3 rounded-xl font-semibold transition">
                                Contact Pharmacy
                            </button>
                        </div>
                    </div>

                    {/* Right Card */}
                    <div className="relative">
                        <div className="bg-white text-slate-800 rounded-3xl shadow-2xl p-8">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">
                                    <Pill
                                        size={34}
                                        className="text-blue-700"
                                    />
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold">
                                        Pharmacy Support
                                    </h2>

                                    <p className="text-slate-500">
                                        Fast • Trusted • Affordable
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 space-y-4">
                                {medicineCategories.map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center justify-between border rounded-xl px-4 py-3"
                                    >
                                        <span className="font-medium text-slate-700">
                                            {item}
                                        </span>

                                        <BadgeCheck
                                            size={18}
                                            className="text-green-600"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Services */}
            <div className="max-w-7xl mx-auto px-6 py-20">

                <div className="text-center mb-14">
                    <p className="text-blue-600 font-semibold uppercase tracking-[3px]">
                        Our Facilities
                    </p>

                    <h2 className="text-4xl font-bold text-slate-800 mt-3">
                        Pharmacy Services
                    </h2>

                    <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
                        Comprehensive pharmacy care with expert support and
                        quality healthcare products.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

                    {pharmacyServices.map((service) => {
                        const Icon = service.icon;

                        return (
                            <div
                                key={service.title}
                                className="bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition border border-slate-100"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center">
                                    <Icon
                                        size={30}
                                        className="text-blue-700"
                                    />
                                </div>

                                <h3 className="text-xl font-bold text-slate-800 mt-6">
                                    {service.title}
                                </h3>

                                <p className="text-slate-600 mt-4 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-900 text-white">
                <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

                    <div>
                        <h2 className="text-4xl font-bold">
                            Need Medicines Quickly?
                        </h2>

                        <p className="mt-4 text-blue-100 leading-relaxed">
                            Contact our pharmacy team for medicine availability,
                            emergency support and healthcare assistance.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
                        <button className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-4 rounded-xl font-semibold transition">
                            <Phone size={20} />
                            Call Now
                        </button>

                        <button className="border border-white hover:bg-white hover:text-blue-900 px-6 py-4 rounded-xl font-semibold transition">
                            Get Directions
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
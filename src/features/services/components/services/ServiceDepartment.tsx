
import servicesData from "../../../../data/services-data.json";
import IndoorServices from "../indoor-services";
import OutdoorServices from "../outdoor-services";
import DiagnosticServices from "../diagnostic-services";



type ServiceDepartmentProps = {
    department: string;
};

type ServiceDepartmentData = {
    department: string;
    title: string;
    tagline?: string;
    description: string;
    image?: string;
    icon?: string;
    highlights?: Array<string>;
    features: Array<string>;
    component?:string
};

function getDepartmentData(department: string) {
    return (servicesData as Array<ServiceDepartmentData>).find(
        (item) => item.department.toLowerCase() === department.toLowerCase()
    );
}

const ServiceDepartment: React.FC<ServiceDepartmentProps> = ({ department }) => {
    const data = getDepartmentData(department);
    if (!data) return <div>Service not found.</div>;
    
    return (
        <>
        {
            data.component?
            <GrabComponent componentName={data.component}/>
            :

       ( <div className="max-w-6xl mx-auto py-12 px-6">
            <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] items-center">
                <div>
                    <p className="text-sm uppercase tracking-widest text-blue-600 font-semibold">
                        Service
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold mt-2">
                        {data.title}
                    </h1>
                    {data.tagline ? (
                        <p className="text-lg text-slate-600 mt-3">{data.tagline}</p>
                    ) : null}
                    <p className="text-slate-700 mt-4 leading-relaxed">
                        {data.description}
                    </p>
                    {data.highlights && data.highlights.length > 0 ? (
                        <div className="flex flex-wrap gap-2 mt-5">
                            {data.highlights.map((item: string) => (
                                <span
                                    key={item}
                                    className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg bg-slate-100">
                    {data.image ? (
                        <img
                            src={data.image}
                            alt={`${data.title} service`}
                            className="w-full h-72 md:h-80 object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-72 md:h-80 bg-slate-200" />
                    )}
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-semibold">What we offer</h2>
                <p className="text-slate-600 mt-2">
                    Core services and procedures available for this service.
                </p>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                    {data.features.map((feature: string) => (
                        <div
                            key={feature}
                            className="rounded-xl border bg-white p-5 shadow-sm hover:shadow-md transition"
                        >
                            <h3 className="font-semibold text-slate-900">{feature}</h3>
                            <p className="text-sm text-slate-600 mt-2">
                                Learn more about our {feature.toLowerCase()} program and how it
                                supports your care journey.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>)
        }
</>
    );
};

export default ServiceDepartment;

type GrabComponentProps = {
    componentName: string;
};

function GrabComponent({
    componentName,
}: GrabComponentProps) {

    if (componentName === "OutdoorServices") {
        return <OutdoorServices />;
    }
    if (componentName === "IndoorServices") {
        return <IndoorServices />;
    }
       if (componentName === "DiagnosticServices") {
        return <DiagnosticServices />;
    }
    return <div>Component not found.</div>;
}
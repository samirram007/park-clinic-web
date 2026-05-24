export default function ServicesPage({ data }: { data: any }) {
    if (!data) {
        return (
            <div className="text-center py-20 text-red-500 text-xl">
                Department not found
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="bg-white shadow-xl rounded-2xl p-8 border">

                <h1 className="text-4xl font-bold mb-4 text-blue-600">
                    {data.title}
                </h1>

                <p className="mb-6 text-gray-600 leading-relaxed">
                    {data.description}
                </p>

                <div>
                    <h2 className="text-xl font-semibold mb-3">Services</h2>

                    <ul className="grid grid-cols-2 gap-3">
                        {data.services.map((item: string, i: number) => (
                            <li
                                key={i}
                                className="bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
}
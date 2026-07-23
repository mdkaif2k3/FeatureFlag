import { useState, useEffect } from "react";
import { getOrganizations } from "./services/organizationService";

function App() {

    const [organizations, setOrganizations] = useState([]);

    useEffect(() => {
        fetchOrganizations();
    }, []);

    const fetchOrganizations = async () => {
        try {
            const data = await getOrganizations();
            setOrganizations(data)
        } catch (error){
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Feature Flag Management
                        </h1>
                        <p className="text-sm text-slate-500">
                            Super Admin
                        </p>
                    </div>

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition">
                        + Organization
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                {organizations.map((organization) => (
                    <div key={organization.id} className="border-b">

                        <div className="grid grid-cols-3 items-center px-6 py-4 hover:bg-slate-50 cursor-pointer">

                            <div className="flex items-center gap-3">
                                <span className="text-lg">▶</span>

                                <span className="font-medium">
                                    {organization.name}
                                </span>
                            </div>

                            <div className="text-slate-500">
                                {new Date(organization.createdAt).toLocaleDateString()}
                            </div>

                            <div className="flex justify-end gap-3">
                                <button className="text-blue-600 hover:text-blue-800">
                                    Edit
                                </button>

                                <button className="text-red-600 hover:text-red-800">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}

export default App;

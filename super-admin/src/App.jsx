import { useState, useEffect } from "react";
import { getOrganizations, createOrganization, updateOrganization, deleteOrganization } from "./services/organizationService";

function App() {

    const [organizations, setOrganizations] = useState([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [organizationName, setOrganizationName] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedOrganization, setSelectedOrganization] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [organizationToDelete, setOrganizationToDelete] = useState(null);

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

    const handleCreateOrganization = async () => {
        try {
            await createOrganization({
                name: organizationName
            });

            fetchOrganizations();
            setOrganizationName("");
            setIsCreateModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateOrganization = async () => {
        try {
            await updateOrganization(
                selectedOrganization.id,
                {
                    name: organizationName
                }
            );
            await fetchOrganizations();
            setIsEditModalOpen(false);
            setSelectedOrganization(null);
            setOrganizationName("");
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteOrganization = async () => {
        try {
            await deleteOrganization(organizationToDelete.id);
            await fetchOrganizations();
            setIsDeleteModalOpen(false);
            setOrganizationToDelete(null);
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

                    <button onClick={() => setIsCreateModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition">
                        + Organization
                    </button>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6">
                {organizations.length === 0 ? (
                    <div className="text-center py-16 border rounded-xl bg-white">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            No organizations available
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Create your first organization to get started.
                        </p>
                    </div>
                ) : (
                organizations.map((organization) => (
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
                                <button onClick={() => {setSelectedOrganization(organization); setOrganizationName(organization.name); setIsEditModalOpen(true);}} className="text-blue-600 hover:text-blue-800">
                                    Edit
                                </button>

                                <button onClick={() => {setOrganizationToDelete(organization); setIsDeleteModalOpen(true);}} className="text-red-600 hover:text-red-800">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )))}
            </main>
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <h2 className="text-2xl font-bold mb-6">
                            Create Organization
                        </h2>
                        <div className="space-y-2">
                            <label className="font-medium">
                                Organization Name
                            </label>
                            <input type="text" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} placeholder="Enter organization name" className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="flex justify-end gap-3 mt-8">
                            <button onClick={() => {setIsCreateModalOpen(false); setOrganizationName("");}} className="px-5 py-2 rounded-lg border">
                                Cancel
                            </button>
                            <button onClick={handleCreateOrganization} className="px-5 py-2 rounded-lg bg-blue-600 text-white">
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <h2 className="text-2xl font-bold mb-6">
                            Edit Organization
                        </h2>
                        <div className="space-y-2">
                            <label className="font-medium">
                                Organization Name
                            </label>
                            <input type="text" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="flex justify-end gap-3 mt-8">
                            <button onClick={() => { setIsEditModalOpen(false); setSelectedOrganization(null); setOrganizationName(""); }} className="px-5 py-2 rounded-lg border">
                                Cancel
                            </button>
                            <button onClick={handleUpdateOrganization} className="px-5 py-2 rounded-lg bg-blue-600 text-white">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                        <h2 className="text-2xl font-bold text-red-600">
                            Delete Organization
                        </h2>
                        <p className="mt-4 text-slate-600">
                            Are you sure you want to delete
                            <span className="font-semibold">
                                {" "}
                                {organizationToDelete?.name}
                            </span>
                            ?
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                            This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-3 mt-8">
                            <button onClick={() => {setIsDeleteModalOpen(false); setOrganizationToDelete(null);}} className="px-5 py-2 rounded-lg border">
                                Cancel
                            </button>
                            <button onClick={handleDeleteOrganization} className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition">
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;

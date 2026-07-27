import { useState, useEffect } from "react";
import { getOrganizations } from "./services/organizationService";
import { getFeatureFlags, updateOrganizationFeature } from "./services/featureflagService";

function App() {
  const [organizations, setOrganizations] = useState([]);
  const [featureFlags, setFeatureFlags] = useState([]);
  const [expandedOrganization, setExpandedOrganization] = useState(null);

  useEffect(() => {
    fetchOrganizations();
    fetchFeatureFlags();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const data = await getOrganizations();
      setOrganizations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFeatureFlags = async () => {
    try {
      const data = await getFeatureFlags();
      setFeatureFlags(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleFeature = async (organizationFeature) => {
    try {
      await updateOrganizationFeature(
        organizationFeature.id,
        !organizationFeature.enabled
      );

      await fetchFeatureFlags();
    } catch (error) {
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
              Admin
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold">
              Organizations
            </h2>
          </div>

          {organizations.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-700">
                No organizations available
              </h2>
            </div>
          ) : (
            organizations.map((organization) => (
              <div key={organization.id} className="border-b">
                <div
                  onClick={() =>
                    setExpandedOrganization(
                      expandedOrganization === organization.id
                        ? null
                        : organization.id
                    )
                  }
                  className="grid grid-cols-2 items-center px-6 py-4 hover:bg-slate-50 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">
                      {expandedOrganization === organization.id ? "▼" : "▶"}
                    </span>

                    <span className="font-medium">
                      {organization.name}
                    </span>
                  </div>

                  <div className="text-right text-slate-500">
                    {new Date(
                      organization.createdAt
                    ).toLocaleDateString()}
                  </div>
                </div>

                {expandedOrganization === organization.id && (
                  <div className="bg-slate-50 px-10 py-4">
                    {featureFlags.map((featureFlag) =>
                      featureFlag.organizationFeatures.filter(
                          (organizationFeature) =>
                            organizationFeature.organization.id ===
                            organization.id
                        )
                        .map((organizationFeature) => (
                          <div key={organizationFeature.id} className="flex justify-between items-center py-3 border-b last:border-b-0">
                            <span>{featureFlag.name}</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" checked={organizationFeature.enabled} onChange={() =>handleToggleFeature(organizationFeature)} className="sr-only peer" />

                              <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-600 transition-colors duration-300"></div>

                              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
                            </label>
                          </div>
                        ))
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

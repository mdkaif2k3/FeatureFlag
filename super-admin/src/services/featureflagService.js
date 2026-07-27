import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000",
});

export const createFeatureFlag = async (featureFlag) => {
    const response = await API.post("/feature-flags", featureFlag);
    return response.data;
};

export const getFeatureFlags = async () => {
    const response = await API.get("/feature-flags");
    return response.data;
};

export const updateFeatureFlag = async (id, featureFlag) => {
    const response = await API.put(`/feature-flags/${id}`, featureFlag);
    return response.data;
};

export const deleteFeatureFlag = async (id) => {
    const response = await API.delete(`/feature-flags/${id}`);
    return response.data;
};

export const updateOrganizationFeature = async (id, enabled) => {
    const response = await API.patch(`/organization-features/${id}`, {enabled});
    return response.data;
};
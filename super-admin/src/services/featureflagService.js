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
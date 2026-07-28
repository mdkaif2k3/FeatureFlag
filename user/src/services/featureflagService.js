import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000",
});

export const getFeatureFlags = async () => {
    const response = await API.get("/feature-flags");
    return response.data;
};
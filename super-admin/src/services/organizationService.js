import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000"
})

export const getOrganizations = async () => {
    const response = await API.get("/organizations");
    return response.data;
}

export const createOrganization = async (organization) => {
    const response = await API.post("/organizations", organization);
    return response.data;
}

export const updateOrganization = async (id, organization) => {
    const reponse = await API.put(`/organizations/${id}`, organization);
    return reponse.data;
}

export const deleteOrganization = async (id) => {
    const response = await API.delete(`/organizations/${id}`);
    return response.data;
}
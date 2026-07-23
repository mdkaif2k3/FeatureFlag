import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000"
})

export const getOrganizations = async () => {
    const response = await API.get("/organizations");
    return response.data 
}
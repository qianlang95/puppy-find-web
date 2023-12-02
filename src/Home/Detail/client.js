import axios from "axios";
export const API = "http://localhost:4001";

export const PETS_API = `${API}/api/pets`

export const findPetById = async(id) => {
    const response = await axios.get(`${PETS_API}/${id}`);
    return response.data;
}

export const pet = async (user) => {
    const response = await axios.post(`${PETS_API}/pet`);
    return response.data;
}
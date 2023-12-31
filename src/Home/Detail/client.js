import axios from "axios";
// export const API = "http://localhost:4000";
export const API = process.env.REACT_APP_BASE_API_URL;

export const POSTS_API = `${API}/api/posts`
const request = axios.create({withCredentials:false})

export const findPetById = async(id) =>{
    const response = await request.get(`${POSTS_API}/${id}`)
    return response.data;
}

// export const findPetById = async(id) => {
//     const response = await axios.get(`${PETS_API}/${id}`);
//     return response.data;
// }

// export const pet = async (user) => {
//     const response = await axios.post(`${POSTS_API}/pet`);
//     return response.data;
// }
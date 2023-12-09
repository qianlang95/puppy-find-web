import axios from "axios";

const API_BASE = "http://localhost:4000/api";

const LIKES_API = `${API_BASE}/likes`;


export const findBreedThatUserLikes = async (userId) => {
  const response = await axios.get(`${LIKES_API}/breeds/${userId}`);
  return response.data;
};
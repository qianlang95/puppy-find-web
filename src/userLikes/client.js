import axios from "axios";

const API_BASE = "https://puppy-find-node-server.onrender.com/api";

const LIKES_API = `${API_BASE}/likes`;


export const findBreedThatUserLikes = async (userId) => {
  const response = await axios.get(`${LIKES_API}/breeds/${userId}`);
  return response.data;
};
import axios from "axios";

const API_BASE = "https://puppy-find-node-server.onrender.com/api";

const POSTS_API = `${API_BASE}/posts`;


export const findPostsOfUser = async (userId) => {
  const response = await axios.get(`${POSTS_API}/user/${userId}`);
  return response.data;
};
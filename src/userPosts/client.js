import axios from "axios";

const API_BASE = "http://localhost:4000/api";

const POSTS_API = `${API_BASE}/posts`;


export const findPostsOfUser = async (userId) => {
  const response = await axios.get(`${POSTS_API}/user/${userId}`);
  return response.data;
};
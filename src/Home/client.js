import axios from "axios";



export const BASE_API= "https://puppy-find-node-server.onrender.com"
export const POSTS_API = `${BASE_API}/api/pets`;

const request = axios.create({withCredentials:false})

export const createPost = async (post) =>{
    const response = await request.post(`${POSTS_API}`, post);
    return response.data;

}

export const findAllPosts = async (req,res) => {
    const response = await request.get(`${POSTS_API}`);
    return response.data;
}

export const deletePost = async(postId) => {
    console.log("Trying to delete", postId)
    const response = await request.delete(`${POSTS_API}/${postId}`)
    return response.data;
}

export const updatePost = async(post) => {
    console.log(` #1 Trying to update ${post._id}`)
    console.log(` #2 Trying to update ${JSON.stringify(post)}`)
    const response = await request.put(`${POSTS_API}/${post._id}`, post);
    return response.data;
}





  
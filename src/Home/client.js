
// import React from "react"
// import { useState } from "react"
// import db from "../Database"


// function client(){

//     const [pets, setPets] = useState(db.pets)
//     const [pet, setPet] = useState({
//         name: "New Name", breed: "terrier", age:"2", location: "San Jose, CA", type: "dog",
//     })

//     const addPet = () =>{
//         setPets([...pets, {...pet, _id: new Date().getTime().toString()}])
//     }
    
//     const deletePet = (petId) => {
//         setPets([...pets, {...pet, _id: new Date().getTime().toString()}])
//     }
    
//     const updatePet = () => {
//         setPets(
//             pets.map( (p) => {
//                 if (p._id === pet._id ){
//                     return pet;
//                 }else{
//                     return p;
//                 }
//             })
//         )
//     }
    

//     return(
//         <>
//         </>
//     );





// }

// export default client;

import axios from "axios";



export const BASE_API= "http://localhost:4001"
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





  
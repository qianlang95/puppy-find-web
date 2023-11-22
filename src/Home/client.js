
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




  
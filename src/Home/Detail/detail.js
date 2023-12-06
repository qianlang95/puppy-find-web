import "../Detail/detail.css"
// import "../Detail/dummy.css"


import * as client from "./client"
import Navbar from "../Navbar/navbar";
import FooterNav from "../Footer";
import "../Detail/v1008-35.jpg"
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";




function Detail(){
    const {id} = useParams();
    const [pet, setPet] = useState({});



    const findPetById = async(id) => {
        const pet = await client.findPetById(id);
        setPet(pet);
    }

    useEffect(() => {
        if(id){
            findPetById(id);
        }else{
            console.log('error here')
        }
    },[])

    // const URL =`http://localhost:4001/api/pets/${id}`


    return(
        <div className="web-container">
            <Navbar/>
            <div className="content" >
                <div class="card  bg-light mb-3" style={{"max-width": "18rem;"}}>
                 <div class="card-header title_pos"> <b>Pet Detail: {pet.name}</b> </div>
                    <div class="card-body">
                        <h5 class="card-title">Give home to your {pet.name}!</h5>
                        <p class="card-text">On PuppyFinder you can find, search and discover puppies that needs a home.</p>
                        <p class="card-text">Breed: {pet.breed}</p>
                        <p class="card-text">Description: {pet.description}</p>
                        <p class="card-text">Type: {pet.type}</p>
                        <p class="card-text">Age: {pet.age}</p>
                        <p class="card-text">Location: {pet.location}</p>
                    </div>
                </div>  
                <div class="alert alert-warning alert_mv" role="alert">
                    To list or start a petition for adopting a puppy you must be registered <a href="#" class="alert-link">Click here to register</a>.
                </div>


            </div>





            <FooterNav/>
        </div>
    );
}

export default Detail;
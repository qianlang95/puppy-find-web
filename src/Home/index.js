
import axios from "axios"
import "./index.css"
import Navbar from "./Navbar/navbar"
import FooterNav from "./Footer"
import  pupImage from "./misc/english-springer-spaniel-dog-puppy-artistic-style-painting-drawing-cartoon-style-illustration-no-background-perfect-for-print-on-demand-merchandise-ai-generative-png-2610760852.png"

import catImage from "./misc/catImage.jpg"

// import * as client from "./client.js"


import db from "../Database"
import { useEffect, useState } from "react"

function Home(){
    // const ewq = ["789", "678", "567"]
    // const qwe = ["890", ...ewq, "456"]
    // const wer = qwe.find((bnm, asd) => bnm === "678")

    // const pets = db.pets;

    // const [pets, setPets] = useState(db.pets)
    // const [pet, setPet] = useState({
    //     name: "New Name", breed: "terrier", age:"2", location: "San Jose, CA", type: "dog",
    // })

    const URL = `http://localhost:4001/api/pets`

    const [pets, setPets] = useState([])
    const [pet, setPet] = useState({
        name: "New Name", breed: "terrier", age:"2", location: "San Jose, CA", type: "dog",
    })


    const fetchPuppies = async () => {
        const response = await axios.get(URL);
        setPets(response.data);   
    }

    useEffect( () => {
        fetchPuppies()
    }, [] )

    const addPet = async () => {
        const response = await axios.post(URL, pet);
        setPets([...pets, {...pet, _id: new Date().getTime().toString()}])

    }


    
    const deletePet = async (petId) => {
        console.log(`about to delete  ${petId}`)
        const response = await axios.delete(`${URL}/${petId}`)
        setPets(pets.filter( (pet) => pet._id !== petId ))
        console.log("succesfully deleted")
    }
    
    const updatePet = async () => {
        const response = await axios.put(`${URL}/${pet._id}`, pet)

        setPets(
            pets.map( (p) => {
                if (p._id === pet._id ){
                    return pet;
                }else{
                    return p;
                }
            })
        )
    }
    

    return(
        <div className="web-container">
            <Navbar/>


            <div className="content">
                <div class="card  bg-light mb-3" style={{"max-width": "18rem;"}}>
                <div class="card-header">Welcome to Puppy Finder Beta</div>
                   <div class="card-body">
                    <h5 class="card-title">Give home to your new puppy!</h5>
                    <p class="card-text">On PuppyFinder you can find, search and discover puppies that needs a home.</p>
                 </div>
             </div>  
             <div class="alert alert-warning alert_mv" role="alert">
                To list or start a petition for adopting a puppy you must be registered <a href="#" class="alert-link">Click here to register</a>.
            </div>


        <div class="card text-center poster">
            <div class="card-header">
             <span className="">
                 <b>
                 🐾 Post a Puppy 🐾
                 </b>
                </span>   
            </div>
        <div class="card-body">
            {/* <h5 class="card-title">Special title treatment</h5>
            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> */}

            <div className="mv-on">

                <div>
                    <select className="form-select" aria-label="Default" onChange={(e)=> setPet({...pet, type: e.target.value})}>
                        <option selected>Choose type of puppy</option>
                        <option value="cat" >Cat</option>
                        <option value="dog">Dog</option>


                    </select>
                </div>
                
                <input  className="form-control" value={pet.name} onChange={(e) => setPet({...pet, name: e.target.value})} placeholder="Name" />
                <input  className="form-control" value={pet.description} onChange={(e) => setPet({...pet, description: e.target.value})} placeholder="Description" />
                <input  className="form-control" value={pet.breed} onChange={(e)=> setPet({...pet, breed: e.target.value})} placeholder="Breed" />
                <input  className="form-control"  value={pet.age} onChange={(e) => setPet({...pet, age: e.target.value})} placeholder="Age" type="number" />
                {/* <input  className="form-control" placeholder="Lifespan" type="number" /> */}
                <input  className="form-control" value={pet.location} onChange={(e) => setPet({...pet, location: e.target.value })} placeholder="Location" type="text" />

                {/* <label htmlFor="lol" className="age-f">age</label>
                <input id="lol"   className="form-control age-f" type="date"/> */}
            <li className="list-group-item">                
                <button className="btn btn-warning ed-bs ed-s" onClick={addPet} > <b>Add</b> </button>
                <button className="btn btn-warning ed-s" onClick={updatePet}><b>Update</b></button>

            </li>
            </div>
        </div>


        </div>


            {/* //The puppy cards will be added here */}

            <div className="container-fluid flex-wrap moved">


                <div className="row spacing">
                    {pets.map((pet) => (


                        <div className="card mv_up" style={{"width": "15rem"}}>
                    {/* <img src={pupImage} className="card-img-top" alt="..." /> */}
                    <img src={pet.type === "dog" ? pupImage : catImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{pet.name}</h5>
                        <p className="card-text">{pet.description}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Type: {pet.type}</li>
                        <li className="list-group-item">Breed: {pet.breed}</li>
                        <li className="list-group-item">Age: {pet.age}</li>
                        <li className="list-group-item">Location: {pet.location}</li>

                    </ul>

                    <button className="btn btn-warning" onClick={ (event) => {event.preventDefault(); setPet(pet);  } }>Edit</button>


                    <button className="btn btn-danger"  onClick={(event) => {event.preventDefault(); deletePet(pet._id)}}>Delete Post</button>
                </div>


                    ))}


                </div>
            </div>


            <div>
                {/* <h2>test</h2> */}
             </div>


            </div>

            <FooterNav/>




  </div>


    );

}

export default Home;
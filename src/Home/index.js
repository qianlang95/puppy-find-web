import * as userClient from "../users/client.js"
import axios from "axios"
import "./index.css"

import Navbar from "./Navbar/navbar"
import FooterNav from "./Footer"
import  pupImage from "./misc/english-springer-spaniel-dog-puppy-artistic-style-painting-drawing-cartoon-style-illustration-no-background-perfect-for-print-on-demand-merchandise-ai-generative-png-2610760852.png"
import { Link } from "react-router-dom"
import catImage from "./misc/catImage.jpg"
import * as client from "./client"

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

    // const URL = `http://localhost:4001/api/pets`
    const [account, setAccount] = useState(null);
    const [pets, setPets] = useState([])
    const [pet, setPet] = useState({
        name: "New Name", breed: "terrier", age:"2", location: "San Jose, CA", type: "dog",
    })

    const fetchAccount = async() => {
        try {
            const user = await userClient.account();
            setAccount(user)
        } catch (error) {
            console.error("Error in fetching the account", error)
            
        }
    }



    const fetchPuppies = async () => {
        const puppies = await client.findAllPosts();
        setPets(puppies)
    }

    useEffect( () => {
        fetchPuppies()
    }, [] )

    useEffect( () => {
        console.log(pets)
    }, [pets] )

    useEffect( () => {
        fetchAccount();
    }, [] )

    useEffect( () => {
        console.log("Account Info from HomePage: ", account)
    }, [account] )

    const breedIdMaps = {
        "Affenpinscher": 1,
        "Afghan Hound": 2,
        "African Hunting Dog": 3,
        "Airedale Terrier": 4,
        "Akbash Dog": 5,
        "Akita": 6,
        "Alapaha Blue Blood Bulldog": 7,
        "Alaskan Husky": 8,
        "Alaskan Malamute": 9,
        "American Bulldog": 10,
        "American Bully": 11,
        "American Eskimo Dog": 12,
        "American Eskimo Dog (Miniature)": 13,
        "American Foxhound": 14,
        "American Pit Bull Terrier": 15,
        "American Staffordshire Terrier": 16,
        "American Water Spaniel": 17,
        "Anatolian Shepherd Dog": 18,
        "Appenzeller Sennenhund": 19,
        "Australian Cattle Dog": 21,
        "Australian Kelpie": 22,
        "Australian Shepherd": 23,
        "Australian Terrier": 24,
        "Azawakh": 25,
        "Barbet": 26,
        "Basenji": 28,
        "Basset Bleu de Gascogne": 29,
        "Basset Hound": 30,
        "Beagle": 31,
        "Bearded Collie": 32,
        "Beauceron": 33,
        "Bedlington Terrier": 34,
        "Belgian Malinois": 36,
        "Belgian Tervuren": 38,
        "Bernese Mountain Dog": 41,
        "Bichon Frise": 42,
        "Black and Tan Coonhound": 43,
        "Bloodhound": 45,
        "Bluetick Coonhound": 47,
        "Boerboel": 48,
        "Border Collie": 50,
        "Border Terrier": 51,
        "Boston Terrier": 53,
        "Bouvier des Flandres": 54,
        "Boxer": 55,
        "Boykin Spaniel": 56,
        "Bracco Italiano": 57,
        "Briard": 58,
        "Brittany": 59,
        "Bull Terrier": 61,
        "Bull Terrier (Miniature)": 62,
        "Bullmastiff": 64,
        "Cairn Terrier": 65,
        "Cane Corso": 67,
        "Cardigan Welsh Corgi": 68,
        "Catahoula Leopard Dog": 69,
        "Caucasian Shepherd (Ovcharka)": 70,
        "Cavalier King Charles Spaniel": 71,
        "Chesapeake Bay Retriever": 76,
        "Chinese Crested": 78,
        "Chinese Shar-Pei": 79,
        "Chinook": 80,
        "Chow Chow": 81,
        "Clumber Spaniel": 84,
        "Cocker Spaniel": 86,
        "Cocker Spaniel (American)": 87,
        "Coton de Tulear": 89,
        "Dalmatian": 92,
        "Doberman Pinscher": 94,
        "Dogo Argentino": 95,
        "Dutch Shepherd": 98,
        "English Setter": 101,
        "English Shepherd": 102,
        "English Springer Spaniel": 103,
        "English Toy Spaniel": 104,
        "English Toy Terrier": 105,
        "Eurasier": 107,
        "Field Spaniel": 108,
        "Finnish Lapphund": 110,
        "Finnish Spitz": 111,
        "French Bulldog": 113,
        "German Pinscher": 114,
        "German Shepherd Dog": 115,
        "German Shorthaired Pointer": 116,
        "Giant Schnauzer": 119,
        "Glen of Imaal Terrier": 120,
        "Golden Retriever": 121,
        "Gordon Setter": 123,
        "Great Dane": 124,
        "Great Pyrenees": 125,
        "Greyhound": 127,
        "Griffon Bruxellois": 128,
        "Harrier": 129,
        "Havanese": 130,
        "Irish Setter": 134,
        "Irish Terrier": 135,
    }

    const handeBreedId = (e) => {
        const breed = e.target.value;
        const breedId = breedIdMaps[breed];
        const userId = account.username;
        setPet({...pet, breed: breed, breedId: breedId, userId: userId})
    }



    const addPost = async () => {
        try {
            const newPost = await client.createPost(pet);
            setPets([newPost,...pets])
        } catch (error) {
            console.log(error);
            
        }
    }




    const deletePet = async (petId) => {
        console.log("Trying to delete", petId)
        try {
            await client.deletePost(petId);
            setPets(pets.filter( (p)=> p._id !== petId ))
        } catch (error) {
            console.log(error)
        }
    }

    const updatePet = async () => {

        try {
            console.log("When updating thats :", pet)
            const status = await client.updatePost(pet);
            setPets(pets.map( (p) => (p._id === pet._id ? pet : p) ))
        } catch (error) {
            console.log(error)
            
        }
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
                <select className="form-select" aria-label="Default" onChange={handeBreedId}>
                    <option selected>Select a breed </option>
                    <option value="Affenpinscher">Affenpinscher</option>
                    <option value="Afghan Hound">Afghan Hound</option>
                    <option value="African Hunting Dog">African Hunting Dog</option>
                    <option value="Airedale Terrier">Airedale Terrier</option>
                    <option value="Akbash Dog">Akbash Dog</option>
                    <option value="Akita">Akita</option>
                    <option value="Alapaha Blue Blood Bulldog">Alapaha Blue Blood Bulldog</option>
                    <option value="Alaskan Husky">Alaskan Husky</option>
                    <option value="Alaskan Malamute">Alaskan Malamute</option>
                    <option value="American Bulldog">American Bulldog</option>
                    <option value="American Bully">American Bully</option>
                    <option value="American Eskimo Dog">American Eskimo Dog</option>
                    <option value="American Eskimo Dog (Miniature)">American Eskimo Dog (Miniature)</option>
                    <option value="American Foxhound">American Foxhound</option>
                    <option value="American Pit Bull Terrier">American Pit Bull Terrier</option>
                    <option value="American Staffordshire Terrier">American Staffordshire Terrier</option>
                    <option value="American Water Spaniel">American Water Spaniel</option>
                    <option value="Anatolian Shepherd Dog">Anatolian Shepherd Dog</option>
                    <option value="Appenzeller Sennenhund">Appenzeller Sennenhund</option>
                    <option value="Australian Cattle Dog">Australian Cattle Dog</option>
                    <option value="Australian Kelpie">Australian Kelpie</option>
                    <option value="Australian Shepherd">Australian Shepherd</option>
                    <option value="Australian Terrier">Australian Terrier</option>
                    <option value="Azawakh">Azawakh</option>
                    <option value="Barbet">Barbet</option>
                    <option value="Basenji">Basenji</option>
                    <option value="Basset Bleu de Gascogne">Basset Bleu de Gascogne</option>
                    <option value="Basset Hound">Basset Hound</option>
                    <option value="Beagle">Beagle</option>
                    <option value="Bearded Collie">Bearded Collie</option>
                    <option value="Beauceron">Beauceron</option>
                    <option value="Bedlington Terrier">Bedlington Terrier</option>
                    <option value="Belgian Malinois">Belgian Malinois</option>
                    <option value="Belgian Tervuren">Belgian Tervuren</option>
                    <option value="Bernese Mountain Dog">Bernese Mountain Dog</option>
                    <option value="Bichon Frise">Bichon Frise</option>
                    <option value="Black and Tan Coonhound">Black and Tan Coonhound</option>
                    <option value="Bloodhound">Bloodhound</option>
                    <option value="Bluetick Coonhound">Bluetick Coonhound</option>
                    <option value="Boerboel">Boerboel</option>
                    <option value="Border Collie">Border Collie</option>
                    <option value="Border Terrier">Border Terrier</option>
                    <option value="Boston Terrier">Boston Terrier</option>
                    <option value="Bouvier des Flandres">Bouvier des Flandres</option>
                    <option value="Boxer">Boxer</option>
                    <option value="Boykin Spaniel">Boykin Spaniel</option>
                    <option value="Bracco Italiano">Bracco Italiano</option>
                    <option value="Briard">Briard</option>
                    <option value="Brittany">Brittany</option>
                    <option value="Bull Terrier">Bull Terrier</option>
                    <option value="Bull Terrier (Miniature)">Bull Terrier (Miniature)</option>
                    <option value="Bullmastiff">Bullmastiff</option>
                    <option value="Cairn Terrier">Cairn Terrier</option>
                    <option value="Cane Corso">Cane Corso</option>
                    <option value="Cardigan Welsh Corgi">Cardigan Welsh Corgi</option>
                    <option value="Catahoula Leopard Dog">Catahoula Leopard Dog</option>
                    <option value="Caucasian Shepherd (Ovcharka)">Caucasian Shepherd (Ovcharka)</option>
                    <option value="Cavalier King Charles Spaniel">Cavalier King Charles Spaniel</option>
                    <option value="Chesapeake Bay Retriever">Chesapeake Bay Retriever</option>
                    <option value="Chinese Crested">Chinese Crested</option>
                    <option value="Chinese Shar-Pei">Chinese Shar-Pei</option>
                    <option value="Chinook">Chinook</option>
                    <option value="Chow Chow">Chow Chow</option>
                    <option value="Clumber Spaniel">Clumber Spaniel</option>


                </select>

                {/* <input  className="form-control" value={pet.breed} onChange={(e)=> setPet({...pet, breed: e.target.value})} placeholder="Breed" /> */}
                <input  className="form-control"  value={pet.age} onChange={(e) => setPet({...pet, age: e.target.value})} placeholder="Age" type="number" />
                {/* <input  className="form-control" placeholder="Lifespan" type="number" /> */}
                <input  className="form-control" value={pet.location} onChange={(e) => setPet({...pet, location: e.target.value })} placeholder="Location" type="text" />

                {/* <label htmlFor="lol" className="age-f">age</label>
                <input id="lol"   className="form-control age-f" type="date"/> */}
            <li className="list-group-item">                
                <button className="btn btn-warning ed-bs ed-s" onClick={addPost} > <b>Add</b> </button>
                <button className="btn btn-warning ed-s" onClick={updatePet}><b>Update</b></button>

            </li>
            </div>
        </div>


        </div>


            {/* //The puppy cards will be added here */}

            <div className="container-fluid flex-wrap moved">


                <div className="row spacing">
                    {pets.map((pet) => (


                        <div key={pet._id} className="card mv_up" style={{"width": "15rem"}}>
                    {/* <img src={pupImage} className="card-img-top" alt="..." /> */}
                    <img src={pet.type === "dog" ? pupImage : catImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <Link to={`/post/${pet._id}`}>

                        <h5 className="card-title">{pet.name}</h5>
                        </Link>
                        <p className="card-text">{pet.description}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Type: {pet.type}</li>
                        <li className="list-group-item">Breed: {pet.breed}</li>
                        <li className="list-group-item">Age: {pet.age}</li>
                        <li className="list-group-item">Location: {pet.location}</li>
                        <li className="list-group-item">userId: {pet.userId}</li>

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

import "./index.css"
import Navbar from "./Navbar/navbar"
import FooterNav from "./Footer"
import  pupImage from "./misc/english-springer-spaniel-dog-puppy-artistic-style-painting-drawing-cartoon-style-illustration-no-background-perfect-for-print-on-demand-merchandise-ai-generative-png-2610760852.png"

import catImage from "./misc/catImage.jpg"

import db from "../Database"

function Home(){


    const ewq = ["789", "678", "567"]
    const qwe = ["890", ...ewq, "456"]
    const wer = qwe.find((bnm, asd) => bnm === "678")

    const pets = db.pets;
    

    return(
        <div className="web-container">
            <Navbar/>
                {/* //Welcome Widget */}



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
                    <select className="form-select" aria-label="Default">
                        <option selected>Choose type of puppy</option>
                        <option value="cat">Cat</option>
                        <option value="cat">Dog</option>


                    </select>
                </div>
                
                <input  className="form-control" placeholder="Name" />
                <input  className="form-control" placeholder="Breed" />
                <input  className="form-control" placeholder="Age" type="number" />
                <input  className="form-control" placeholder="Lifespan" type="number" />
                <input  className="form-control" placeholder="Country of Origin" type="text" />

                {/* <label htmlFor="lol" className="age-f">age</label>
                <input id="lol"   className="form-control age-f" type="date"/> */}
            <li className="list-group-item">                
                <button className="btn btn-warning ed-bs ed-s" > <b>Add</b> </button>
                <button className="btn btn-warning ed-s"><b>Update</b></button>

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

import "./index.css"
import Navbar from "./Navbar/navbar"
import FooterNav from "./Footer"
import  pupImage from "./misc/english-springer-spaniel-dog-puppy-artistic-style-painting-drawing-cartoon-style-illustration-no-background-perfect-for-print-on-demand-merchandise-ai-generative-png-2610760852.png"

function Home(){


    const ewq = ["789", "678", "567"]
    const qwe = ["890", ...ewq, "456"]
    const wer = qwe.find((bnm, asd) => bnm === "678")




    

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


            {/* //The puppy cards will be added here */}

            <div className="container-fluid flex-wrap moved">


                <div className="row spacing">
                {/* <div className="col white_spacing_up"> */}

                <div className="card mv_up" style={{"width": "18rem"}}>
                    <img src={pupImage} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Breed: Spaniel</li>
                        <li className="list-group-item">Age: 1 month</li>
                        <li className="list-group-item">Location: San Jose, CA</li>
                        {/* <li className="list-group-item">A third item</li> */}
                    </ul>

                    {/* <div className="card-body">
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div> */}

                </div>




      




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
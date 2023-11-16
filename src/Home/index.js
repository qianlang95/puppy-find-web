
import "./index.css"
import Navbar from "./Navbar/navbar"
import FooterNav from "./Footer"

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
            {/* //The puppy cards will be added here */}
            <div>
                <h2>test</h2>
             </div>






            </div>

    


            <FooterNav/>




  </div>


    );

}

export default Home;

import "./index.css"
import Navbar from "./Navbar/navbar"

function Home(){


    const ewq = ["789", "678", "567"]
    const qwe = ["890", ...ewq, "456"]
    const wer = qwe.find((bnm, asd) => bnm === "678")




    

    return(
        <div>
            <Navbar/>
            

  </div>


    );

}

export default Home;
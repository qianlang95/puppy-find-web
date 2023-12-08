
import Navbar from "../Navbar/navbar";
import FooterNav from "../Footer";
import "../About/about.css"
import { Accordion } from 'react-bootstrap';

function About() {
    return (
        <div className="web-container">
            <Navbar/>
            <div className="content">


            <div className="card  bg-light mb-3" style={{"max-width": "18rem;"}}>
                <div className="card-header"><b>About 🐶</b></div>
                   <div className="card-body">
                    <h5 className="card-title">Learn about our aspirations  🐾</h5>
                    {/* <p className="card-text">On PuppyFinder you can find, search and discover puppies that needs a home.</p> */}
                 </div>
             </div> 


                <div className="acc-cointaner">

                {/* <div className="progress" role="progressbar" aria-label="Warning striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <div  className="progress-bar progress-bar-striped bg-warning" style={{"width": "75%"}}></div>
                </div> */}

                <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar progress-bar-striped progress-bar-animated" style={{"width": "90%"}}></div>
                </div>


                <Accordion defaultActiveKey="0" flush>

                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Why Puppy Finder? </Accordion.Header>
                        <Accordion.Body>
                            This is the first item's accordion body.
                        </Accordion.Body>
                    </Accordion.Item>


                    <Accordion.Item eventKey="1">
                        <Accordion.Header>The secret recipe</Accordion.Header>
                        <Accordion.Body>
                            This is the second item's accordion body.
                        </Accordion.Body>
                    </Accordion.Item>

                </Accordion>

                </div>


            </div>
            <FooterNav/>
        </div>
    );
}

export default About;

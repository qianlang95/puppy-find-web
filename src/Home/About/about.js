
import FooterNav from "../Footer";
import "../About/about.css"
import { Accordion } from 'react-bootstrap';

function About() {
    return (
        <div className="web-container">
            <div className="content">


            <div className="card  bg-light " style={{"max-width": "18rem;"}}>
                <div className="card-header"><b>About 🐶</b></div>
                   <div className="card-body">
                    <h5 className="card-title">Learn about our aspirations  🐾</h5>

                    <div className="acc-cointaner">

{/* <div className="progress" role="progressbar" aria-label="Warning striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
    <div  className="progress-bar progress-bar-striped bg-warning" style={{"width": "75%"}}></div>
</div> */}
{/* 
                            <div className="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">
                                <div className="progress-bar progress-bar-striped progress-bar-animated" style={{"width": "90%"}}></div>
                            </div> */}


                            <Accordion defaultActiveKey="0" flush>

                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Why Puppy Finder? </Accordion.Header>
                                    <Accordion.Body>
                                    <p>Puppy Finder stands out in the world of pet adoption for several reasons: <br/> <br/>
                                    <b>User-Centric Design:</b> Our platform is designed with the user in mind. The interface is intuitive and easy to navigate, ensuring a hassle-free experience for both buyers and sellers. <br/> <br/>
                                    <b>Location-Based Searches:</b> We understand the importance of finding a puppy nearby. Our location-based search feature helps you find available puppies in your area, reducing travel stress for both you and your future pet. <br/> <br/>
                                    <b>Diverse Selection:</b> With a wide range of breeds, ages, and personalities, Puppy Finder caters to the diverse preferences of potential pet owners, ensuring there's a match for everyone. <br/><br/>
                                    <b>Trust and Transparency:</b> Profiles of puppies are detailed and vetted, providing all the necessary information to make an informed decision. Trust and transparency are our core values. <br/><br/>
                                    <b>Technical Excellence:</b> Built with modern technologies, Puppy Finder offers a smooth, fast, and reliable platform that enhances your puppy-finding experience. <br/><br/>
                                    </p>
                                    
                                    </Accordion.Body>
                                </Accordion.Item>


                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>The secret recipe</Accordion.Header>
                                    <Accordion.Body>
                                    <p>
                                    The secret behind Puppy Finder's success lies in our harmonious blend of technology and passion for pets. Here’s what makes our platform unique:<br/><br/>
                                    <b>Puppy Stack:</b> Utilizing a stack comprising React, HTML, CSS, Bootstrap, MongoDB, Node.js, and Redux, we've crafted a robust, efficient, and responsive platform. This tech stack ensures that Puppy Finder is not only visually appealing but also functionally superior.<br/><br/>
                                    <b>Community-Focused Approach:</b> We believe in building a community. Our platform is more than just a marketplace; it's a place where like-minded individuals come together to share their love for puppies.<br/><br/>
                                    <b>Continuous Improvement:</b> We are committed to continuous improvement, constantly updating our platform to incorporate user feedback and the latest technological advancements.<br/><br/>
                                    <b>Dedication to Canine Welfare:</b> At the heart of Puppy Finder is our dedication to the welfare of puppies. We advocate for responsible breeding and ownership, ensuring that every puppy finds a loving and suitable home.<br/><br/>
                                    <b>Accessibility and Inclusivity:</b> Accessibility is key. Our deployment through Render and Netlify ensures that Puppy Finder is available to a wide audience, breaking down geographical barriers in puppy adoption.<br/><br/>
                                    </p>
                                    </Accordion.Body>
                                </Accordion.Item>

                            </Accordion>


                            </div>


                            <div className="webcoint">
                                <div className="about-cl">

                                <div className="card card-ed" style={{"width": "18rem", "height":"15rem"}}>
                                    <div class="card-body">
                                        <h5 className="card-title">Mattia</h5>
                                        <div className="float-end">
                                            <p className="btn btn-warning bt-ed"> <b>Role</b>🐈‍🐈</p>
                                        </div><br/><br/><br/>

                                        <div className="float-c">
                                        <p className="card-text">Dashboard & About Us. Frontend & Backend</p>
                                        </div>
                                        <br/>
                                        <div className="float-center">
                                                <a href="#" className="btn btn-dark">GitHub</a>

                                        </div>
                                    </div>
                                </div>

                                <div className="card card-ed" style={{"width": "18rem", "height":"15rem"}}>
                                    <div class="card-body">
                                        <h5 className="card-title">Qian</h5>
                                        <div className="float-end">
                                            <p className="btn btn-warning bt-ed"> <b>Role</b> 🐈 </p>
                                        </div><br/><br/><br/>
                                        <p className="card-text">Search API & Post. Frontend & Backend</p>
                                        <div className="float-center">
                                                <a href="#" className="btn btn-dark">GitHub</a>

                                        </div>
                                    </div>
                                </div>

                                <div className="card card-ed" style={{"width": "18rem", "height":"15rem"}}>
                                    <div class="card-body">
                                        <h5 className="card-title">Sujuan</h5>
                                        <div className="float-end">
                                            <p className="btn btn-warning bt-ed"> <b>Role</b> 🐈 </p>
                                        </div><br/><br/><br/>
                                        <p className="card-text">Login & Users. Frontend & Backend</p>
                                        <div className="float-center">
                                                <a href="#" className="btn btn-dark">GitHub</a>

                                        </div>
                                    </div>
                                </div>

                                </div>

                            </div>
                 </div>
             </div> 


             <div class="card text-center">


                </div>











            </div>
            <FooterNav/>
        </div>
    );
}

export default About;
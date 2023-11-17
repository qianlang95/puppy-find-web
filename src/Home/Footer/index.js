import "./footer.css"

function FooterNav(){



    return(
        <div>

            {/* <footer className="footer-d"> */}
            {/* <div class="card text-white  bg-secondary mb-3" style={{"max-width": "18rem;"}}>
                <div class="card-header">Welcome to Puppy Finder Beta</div>
                   <div class="card-body">
                    <h5 class="card-title">Give home to your new puppy!</h5>
                    <p class="card-text">On PuppyFinder you can find, search and discover puppies that needs a home.</p>
                 </div>
             </div>  */}

             <footer className="footer-d">

             <ul class="nav nav-ed ">
            <li class="nav-item">
                <a class="nav-link active btn btn-warning btn-supp" aria-current="page" href="#">About</a>
             </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Mattia</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Quian</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Sujuan</a>

            </li>

            <li class="nav-item">
                <a class="nav-link disabled" aria-disabled="true">Copyright© 2023</a>
            </li>

            </ul>


             </footer>


            </div>








    );
}

export default FooterNav;


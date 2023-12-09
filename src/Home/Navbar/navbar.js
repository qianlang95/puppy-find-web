

import { NavLink } from "react-router-dom";
import "./index.css"
import "./pet-bg.jpg"
import { useParams, useLocation, useNavigate } from "react-router-dom";
import * as client from "../../users/client";



function Navbar() {

  const navigate = useNavigate();

  const signout = async () => {
    const status = await client.signout();
    navigate("/login");
  };


  const {pathname} = useLocation();
  const path = pathname.split('/')
  console.log("check here" , path[1])

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <a className="navbar-brand nav-logo" href="/">        
       Puppy Finder 🐶🐱
        </a>

      <ul className="navbar-nav post-edit">

        <li className="nav-item post-edit2">
        <li className="nav-item"><NavLink className={`nav-link btn btn-warning nav-pos ${path[1].includes("detail") ? "btn-ultra":""  }  `} to="/">🔎 Search</NavLink></li>  
        </li>




      </ul>

      <div className="action-users">

        <ul className="navbar-nav">

            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-end" to="/login">Login</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-end" to="/register">Register</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-acc" to="/account">Hello, <b>@Mattia</b></NavLink></li>
            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-log" onClick={signout}> <b>Logout</b> </NavLink></li>

            {/* //This will be visible only to the logged-in users  */}
            {/* <li className="nav-item"><NavLink className="nav-link" to="/">Account</NavLink></li> */}
            {/* <li className="nav-item"><NavLink className="nav-link" to="/">Settings</NavLink></li> */}

        </ul>


      </div>
    </nav>
  );
}

export default Navbar;

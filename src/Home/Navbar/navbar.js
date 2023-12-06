

import { NavLink } from "react-router-dom";
import "./index.css"
import "./pet-bg.jpg"

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <a className="navbar-brand nav-logo" href="#">        
       Puppy Finder 🐶🐱
        </a>

      <ul className="navbar-nav post-edit">

        <li className="nav-item post-edit2">
        <li className="nav-item"><NavLink className="nav-link btn btn-warning nav-pos " to="/">🔎 Search</NavLink></li>  
        </li>




      </ul>

      <div className="action-users">

        <ul className="navbar-nav">

            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-end" to="/">Login</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-end" to="/">Register</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-acc" to="/">Hello, <b>@Mattia</b></NavLink></li>
            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-log" to="/"> <b>Logout</b> </NavLink></li>

            {/* //This will be visible only to the logged-in users  */}
            {/* <li className="nav-item"><NavLink className="nav-link" to="/">Account</NavLink></li> */}
            {/* <li className="nav-item"><NavLink className="nav-link" to="/">Settings</NavLink></li> */}

        </ul>


      </div>
    </nav>
  );
}

export default Navbar;

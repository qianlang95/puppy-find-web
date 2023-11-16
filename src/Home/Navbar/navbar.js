

import { NavLink } from "react-router-dom";
import "./index.css"
import "./pet-bg.jpg"

function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <a className="navbar-brand" href="#">Puppy Finder</a>

      <ul className="navbar-nav post-edit">
        <li className="nav-item post-edit2"><NavLink className="nav-link" to="/">

            <button className="btn btn-secondary btn-edit">Post</button>
            </NavLink></li>
        {/* <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li> */}

      </ul>

      <div className="action-users">
        <ul className="navbar-nav">
            <li className="nav-item"><NavLink className="nav-link" to="/">Account</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/">Settings</NavLink></li>

        </ul>


      </div>
    </nav>
  );
}

export default Navbar;

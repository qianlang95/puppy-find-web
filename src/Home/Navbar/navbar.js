
import * as client from "../../users/client.js"
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./index.css"
import "./pet-bg.jpg"
import { useParams, useLocation } from "react-router-dom";
import { set } from "mongoose";
import { Navigate } from "react-router-dom";



function Navbar() {
  const [account, setAccount] = useState(null);
  const {pathname} = useLocation();
  const path = pathname.split('/')
  const navigate = useNavigate();
  console.log("check here" , path[1])

  function handleLogout(){
    setAccount(null);
  }

  const singout = async () => {
    const status = await client.signout();
    setAccount(null);
    navigate("/");
  }

  const fetchAccount = async() => {
    try {
        const user = await client.account();
        setAccount(user)

    } catch (error) {
      console.error("Error fetching the account ", error)
      
    }
  }

  console.log("Check user here: ", setAccount)

  useEffect(() => {
      fetchAccount();

  },[])
  useEffect(() => {
      console.log("Account: ", account)

  },[account])
  

  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <a className="navbar-brand nav-logo" href="#">        
       Puppy Finder 🐶🐱
        </a>

      <ul className="navbar-nav post-edit">

        <li className="nav-item post-edit2">
        <li className="nav-item"><NavLink className={`nav-link btn btn-warning nav-pos ${path[1].includes("post") ? "btn-ultra":""  }  `} to="/">🔎 Search</NavLink></li>  
        </li>




      </ul>

      <div className="action-users">

        <ul className="navbar-nav">

          {/* <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-end" to="/">Login</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-end" to="/">Register</NavLink></li> */}

          {account ? (
            <ul className="navbar-nav">
            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-acc" to={`/profile/${account.id}`}>Hello, <b>{account.username}</b></NavLink></li>
            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-end" to="/account"><b>Settings</b> </NavLink></li>

            <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-log" to="/" onClick={singout} > <b>Logout</b> </NavLink></li>
            </ul>

          ):(
            <ul className="navbar-nav"> 
                    <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-end" to="/login">Login</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link btn btn-secondary nav-end" to="/register">Register</NavLink></li>
            </ul>

          )

          
          }


            {/* //This will be visible only to the logged-in users  */}
            {/* <li className="nav-item"><NavLink className="nav-link" to="/">Account</NavLink></li> */}
            {/* <li className="nav-item"><NavLink className="nav-link" to="/">Settings</NavLink></li> */}

        </ul>


      </div>
    </nav>
  );
}

export default Navbar;

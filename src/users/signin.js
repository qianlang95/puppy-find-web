import * as client from "./client";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './Signin.css';
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signIn = async () => {
    try {
      const credentials = { username: username, password: password };
      const user = await client.signin(credentials);
      dispatch(setCurrentUser(user));
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
  
      <div className="signin-page">
        <div className="signin-container">
          <h2 className="text-center mb-4 white-text">🌟WELCOME BACK!🌟</h2>
          {error && <div className="alert alert-danger">{error.message}</div>}
  
          <div className="mb-3">
            <input 
              type="text"
              className="form-control stylish-input"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
  
          <div className="mb-4">
            <input 
              type="password"
              className="form-control stylish-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
  
          <div className="mb-2 text-center">
            <strong>Login to Your Account</strong>
          </div>
  
          <button className="btn btn-primary w-100 mb-3 bold-button" onClick={signIn}>Signin</button>
  
          <div className="mb-2 text-center">
            <strong>Don't have an account?</strong>
          </div>
  
          <Link to="/register" className="btn btn-secondary w-100">
            Signup here
          </Link>
  
          <div className="text-center">
            <Link to="/" className="btn btn-outline-secondary w-100 mt-2">
              Continue as a Guest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  }  

export default Signin;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as client from "./client";
import './Signin.css';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from './reducer'; 

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer"); // Default role is "buyer"
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signup = async () => {
    try {
      const credentials = { username, password, role }; // Include role in credentials
      const user = await client.signup(credentials);
      dispatch(setCurrentUser(user));
      navigate("/");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div>
    
    <div className="signin-page">
      <div className="signin-container">
        <h2 className="text-center mb-4 white-text">🐕 NEW HERE? 👣</h2>
        <h4 className="text-center mb-4 white-text">Create an account and find your puppy</h4>
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
        <div className="mb-3">
          <input 
            type="password"
            className="form-control stylish-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <select
            className="form-control stylish-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="btn btn-primary w-100 mb-3 bold-large-button" onClick={signup}>Signup</button>
        <Link to="/login" className="btn btn-secondary w-100 bold-large-button">
          Signin here
        </Link>
      </div>
    </div>
  </div>
  );
}

export default Signup;

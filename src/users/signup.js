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
      navigate("/account");
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h1 className="text-center mb-4" style={{ backgroundColor: 'transparent' }}>Signup</h1>
        {error && <div className="alert alert-danger">{error.message}</div>}
        <div className="mb-3">
          <input 
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input 
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <select
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="btn btn-primary w-100 mb-3" onClick={signup}>Signup</button>
        <Link to="/login" className="btn btn-secondary w-100">
          Signin here
        </Link>
      </div>
    </div>
  );
}

export default Signup;

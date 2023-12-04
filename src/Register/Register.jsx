import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3001/register', { name, email, password, role })
      .then((res) => {
        // Navigate directly without setting the userID in state
        navigate(`/login`);
      })
      .catch((err) => console.log(err));
  };
  

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <div className="form-check">
              <input
                type="radio"
                id="buyer"
                name="role"
                value="buyer"
                className="form-check-input"
                checked={role === 'buyer'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label className="form-check-label" htmlFor="customer">Buyer</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="seller"
                name="role"
                value="seller"
                className="form-check-input"
                checked={role === 'seller'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label className="form-check-label" htmlFor="business">Seller</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="admin"
                name="role"
                value="admin"
                className="form-check-input"
                checked={role === 'admin'}
                onChange={(e) => setRole(e.target.value)}
              />
              <label className="form-check-label" htmlFor="admin">Admin</label>
            </div>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Register
          </button>
        </form>
        <p>Already Have an Account?</p>
        <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;

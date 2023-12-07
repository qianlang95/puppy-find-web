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
      navigate("/account");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        <h1 className="text-center mb-4" style={{ backgroundColor: 'transparent' }}>Signin</h1>
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
        <div className="mb-4">
          <input 
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100 mb-3" onClick={signIn}>Signin</button>
        <Link to="/register" className="btn btn-secondary w-100">
          Signup here
        </Link>
      </div>
    </div>
  );
}

export default Signin;

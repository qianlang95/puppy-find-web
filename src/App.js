import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Login/Login";
import { Register } from "./Register/Register";
import Profile from "./Profile/Profile"; // Import the Profile component

function App() {
  const [currentView, setCurrentView] = useState('login');

  const toggleView = (viewName) => {
    setCurrentView(viewName);
  }

  return (
    <div className="App">
      {
        currentView === "login" ? <Login onFormSwitch={() => toggleView('register')} /> :
        currentView === "register" ? <Register onFormSwitch={() => toggleView('profile')} /> :
        <Profile />
      }
    </div>
  );
}

export default App;

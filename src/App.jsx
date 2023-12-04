import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

import Login from './Login/Login';
import Register from './Register/Register';
import Dashboard from './Dashboard/Dashboard';
import Home from './Home/Home';
import Profile from './Profile/UserProfile';
import OtherUserProfile from './OtherProfile/OtherUserProfile';


function App() {

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/profile/:userID" element={<Profile />}></Route>
        <Route path="/viewprofile/:userID" element={<OtherUserProfile />}></Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App



import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    // Initialize authUser state from localStorage if it exists
    const [authUser, setAuthUser] = useState(() => {
      const savedUser = localStorage.getItem('authUser');
      return savedUser ? JSON.parse(savedUser) : { user: null, role: null, userID: null };
    });

    const login = (userData) => {
    setAuthUser({
        ...userData, // Assuming userData includes name, email, role, userID, etc.
    });
    localStorage.setItem('authUser', JSON.stringify(userData)); // Optionally, for persistence
};

      
      const logout = () => {
        setAuthUser({ user: null, role: null, userID: null });
        localStorage.removeItem('authUser'); // Clear user data from localStorage
      };
      

  return (
    <AuthContext.Provider value={{ authUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

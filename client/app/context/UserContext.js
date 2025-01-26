"use client";
import { createContext, useContext, useState } from "react";

// Create Context with default values
const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userDetails, setUserDetails] = useState([]);

  let userData = {
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
    userDetails,
    setUserDetails,
  };
  return (
    <AuthContext.Provider value={{ ...userData }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy context usage
export const useAuth = () => useContext(AuthContext);

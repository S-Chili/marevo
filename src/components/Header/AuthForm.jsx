import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); 
  const [isAuthReady, setIsAuthReady] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const token = Cookies.get("token");

  useEffect(() => {
    const checkAuthStatus = async () => {
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          const response = await axios.get(`${API_URL}/api/auth/check`, {
            withCredentials: true,
          });
          if (response.status === 200) {
            setIsAuthenticated(true);
            setUser(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user)); 
          } else {
            setIsAuthenticated(false);
            setUser(null);
            Cookies.remove("token");
            localStorage.removeItem("user");
          }
        } catch (error) {
          setIsAuthenticated(false);
          setUser(null);
          Cookies.remove("token");
          localStorage.removeItem("user");
        }
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsAuthReady(true);
    };
    checkAuthStatus();
  }, [API_URL, token]); 

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isAuthReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
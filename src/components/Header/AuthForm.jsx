import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

// Створюємо контекст для автентифікації
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Перевіряємо токен при завантаженні сторінки
  useEffect(() => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    Cookies.set("token", token, { expires: 7, secure: true });
    setIsAuthenticated(true);
  };

  const logout = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для використання автентифікації в будь-якому компоненті
export const useAuth = () => useContext(AuthContext);

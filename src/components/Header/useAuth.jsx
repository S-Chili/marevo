// hooks/useAuth.js
import { useState, useEffect, useRef } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const hasCheckedAuth = useRef(false); // Додаємо реф для перевірки

  useEffect(() => {
    const checkAuth = async () => {
      // Якщо вже перевіряли аутентифікацію, не робимо повторний запит
      if (hasCheckedAuth.current) return;
      
      hasCheckedAuth.current = true; // Мітка, що запит зроблено

      try {
        const response = await fetch("http://localhost:3000/api/auth/check", {
          method: "GET",
          credentials: "include",
        });
        
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false); // Встановлюємо аутентифікацію як false у разі помилки
      }
    };

    checkAuth();
  }, []);

  return isAuthenticated;
};

export default useAuth;

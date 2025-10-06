import { useState, useEffect, useRef } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const hasCheckedAuth = useRef(false);
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const checkAuth = async () => {
      if (hasCheckedAuth.current) return;
      
      hasCheckedAuth.current = true; 

      try {
        const response = await fetch(`${API_URL}/api/auth/check`, {
          method: "GET",
          credentials: "include",
        });
        
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [API_URL]);

  return isAuthenticated;
};

export default useAuth;

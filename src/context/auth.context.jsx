// src/context/auth.context.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext();

// eslint-disable-next-line react/prop-types
function AuthProviderWrapper({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate();

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  }

  const authenticateUser = async () => { 
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem('authToken');
    
    // If the token exists in the localStorage
    if (storedToken) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify`, 
          { headers: { Authorization: `Bearer ${storedToken}`} }
        )
         const user = response.data;
         setIsLoggedIn(true);
         setIsLoading(false);
         setUser(user);        
      } catch (error) {      
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);     
      }
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
      navigate("/login");
  }
}

 useEffect(() => {                                    
  authenticateUser()
 }, [])



 const removeToken = () => { 
  localStorage.removeItem("authToken")
}


const logOutUser = () => {   
  console.log ("logging out")
  removeToken() 
  authenticateUser()
} 


  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading, user , setUser, storeToken , authenticateUser , logOutUser}}>
      {children}
    </AuthContext.Provider>
  ) 
}

export { AuthProviderWrapper, AuthContext };

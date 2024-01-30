// src/context/auth.context.js

import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

const AuthContext = React.createContext();

// eslint-disable-next-line react/prop-types
function AuthProviderWrapper({children}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  

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
          `${API_URL}/auth/verify`, 
          { headers: { Authorization: `Bearer ${storedToken}`} }
        )
         console.log (response.data)
         const user = response.data;
        //  const tokenExpiration = response.data.expirationTime;
        //  const expirationTime = tokenExpiration * 1000;
        //  setTimeout(() => {
        //   removeToken();
        //   setIsLoggedIn(false);
        // }, expirationTime);
         setIsLoggedIn(true);
         setIsLoading(false);
         setUser(user);        
      } catch (error) {      
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);     
      }
    } else {
      //console.log ("no token")
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);      
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
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user , storeToken , authenticateUser , logOutUser}}>
      {children}
    </AuthContext.Provider>
  ) 
}

export { AuthProviderWrapper, AuthContext };

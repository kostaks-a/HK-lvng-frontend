/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function PrivateWrapper( { children } ) {
  
  const { authenticateUser , isLoggedIn, isLoading } = useContext(AuthContext);
  const location = useLocation();
  console.log (location)
 // Verify the existing token if there is one.
  //console.log('authenticating')
  //authenticateUser()
  useEffect(() => {
    authenticateUser()
  },[location])

  // If the authentication is still loading 
  if (isLoading) return <p>Loading ...</p>;

  if (!isLoggedIn) {
  // If the user is not logged in 
    console.log ("not authorized")
    return <Navigate to="/login" />;
  } else {
  // If the user is logged in, allow to see the page 
    return children;
  }
}

export default PrivateWrapper;

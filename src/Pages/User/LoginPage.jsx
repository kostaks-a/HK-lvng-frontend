/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import LoginForm from "../../components/LoginForm";
import { Box, Button } from "@mantine/core";



function LoginPage(props) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();
    
    const { storeToken , authenticateUser , setIsLoggedIn} = useContext(AuthContext);

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const requestBody = { username, password };
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, requestBody)
        //console.log('JWT token', response.data.authToken );
        storeToken(response.data.authToken);
        setIsLoggedIn(true); 
        authenticateUser();
        navigate('/Dashboard/recipes')
      } catch (error) {
        setErrorMessage(error.response.data.message)        
      }
    }

  return (
    <Box maw={340} mx="auto" pt={60} mt={50}>
      <h1>Log in</h1>          
      <LoginForm {...{handleSubmit, username, password, handleUsername, handlePassword}} />
      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
      <p>Don`t have an account yet?</p>
      <Button><Link to={"/signup"}> Sign Up</Link></Button>
    </Box>
  )
}

export default LoginPage
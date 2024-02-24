/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import SignupForm from "../../components/SignupForm";
import { Box, Button } from "@mantine/core";

function CreateUser() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()


  const handleUsername = (e) => setUsername(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)


  const handleSubmit = async (e) => {
    e.preventDefault()
    const requestBody = { username , password }
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, requestBody)
      navigate("/login")
    } catch (error){
      console.log (error)
      setErrorMessage(error.response.data.message)
    }
  }



  return (
    <Box maw={340} mx="auto" pt={60} mt={50}>
      <h1>Sign up</h1>          
      <SignupForm {...{handleSubmit, username, password, handleUsername, handlePassword}} />
      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
      <p>Already have account?</p>
      <Button><Link to={"/login"}>Login</Link></Button>
    </Box>
  )
}

export default CreateUser

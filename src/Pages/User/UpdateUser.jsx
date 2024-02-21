import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { Box, Button , Group } from "@mantine/core";
import { AuthContext } from "../../context/auth.context";
import UsernameEntry from "../../components/UsernameEntry";
import PasswordEntry from "../../components/PasswordEntry";

function UpdateUser() {
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")
  const [togglePasswordForm , setTogglePasswordForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState(undefined)
  const storedToken = localStorage.getItem("authToken");
  const { user } = useContext(AuthContext);

  const navigate = useNavigate()


  const handleUsername = (e) => setUsername(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)


  const handleUpdateSubmit = async (e) => {
    e.preventDefault()
    const requestBody = { username , password }
    try {
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/auth/user/update`, requestBody ,
      { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      console.log(response.data)
      navigate("/dashboard/profile")
    } catch (error){
      console.log (error)
      setErrorMessage(error.response.data.message)
    }
  }

  useEffect(() => {
    console.log(user); // Log the current state whenever it changes
  }, [user]);

  return (
    <Box maw={355} mx="auto" pt={60} mt={50}>
      <h1>Update your credentials</h1>
      <div>
      <form onSubmit={handleUpdateSubmit}>
        <UsernameEntry username={username} handleUsername={handleUsername} />
        { togglePasswordForm && <PasswordEntry password={password} handlePassword={handlePassword} /> }
        {/* <PasswordEntry password={password} handlePassword={handlePassword} /> */}
        <Group justify="flex-end" mt="md">
          <Button onClick={() => setTogglePasswordForm(!togglePasswordForm)}>Click here if you wish to update your password</Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
      </div>         
      
      { errorMessage && <p className="error-message">{errorMessage}</p> }

    </Box>
  )
}

export default UpdateUser
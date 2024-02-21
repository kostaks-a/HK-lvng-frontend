/* eslint-disable no-unused-vars */
import { useContext } from 'react'
import { AuthContext } from '../../context/auth.context';
import { Badge, Button, Card, Divider, Group, Image, Text } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PrivateProfile() {

const storedToken = localStorage.getItem("authToken");
const { user , setUser , setIsLoggedIn , setIsLoading } = useContext(AuthContext);
const navigate = useNavigate();


const deleteUser = async () => {
    try {
        const response = await axios.delete(
            `${import.meta.env.VITE_API_URL}/user/${user._id}/delete`,
            {
                headers: { Authorization: `Bearer ${storedToken}` },
            }
        );
        console.log(response.data);
        localStorage.removeItem('authToken');
        setIsLoggedIn(false)
        setUser(null)        
        navigate('/');        
    } catch (error) {
        console.log(error);
    }
}



  return (
    <div style={{ marginTop: "50px" ,paddingTop: "150px" , display: "flex", flexDirection: "column", alignItems: "center"}}>
    <Card shadow="sm" p="lg" radius="md" withBorder style={{ maxWidth: 340, backgroundColor: '#f8f9fa' }}>
      <Group position="apart" style={{ marginBottom: 15, marginTop: 10 }}>
        <Text weight={500} size="lg" style={{ color: '#333' }}>
          {user.username}
        </Text>
        <Badge color="pink" variant="light">
          Chef
        </Badge>
      </Group>

      <Divider style={{ marginBottom: 15 }} />

      <Text size="sm" style={{ color: '#555', lineHeight: 1.5 }}>
        🌮 Recipes Created: <Text component="span" weight={500}>{user.favourites.length}</Text>
      </Text>

      <Text size="sm" style={{ color: '#555', lineHeight: 1.5 }}>
        🗂️ Recipes Saved: <Text component="span" weight={500}>{user.creations.length}</Text>
      </Text>

      <Divider style={{ margin: '15px 0' }} />

      <Group position="right" spacing="md">
        <Link to='./edit'><Button variant="outline" color="blue" size="sm">Edit Profile</Button></Link>
        <Button variant="outline" color="red" size="sm" onClick={deleteUser}>Delete Profile</Button>
      </Group>
    </Card>
    </div>

  )
}

export default PrivateProfile
/* eslint-disable no-unused-vars */

import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Homepage from './Pages/Homepage'
import AllRecipes from './Pages/Recipes/AllRecipes'
import CreateRecipe from './Pages/Recipes/CreateRecipe'
import RecipeDetails from './Pages/Recipes/RecipeDetails'
import UpdateRecipe from './Pages/Recipes/UpdateRecipe'
import CreateUser from './Pages/User/CreateUser'
import UpdateUser from './Pages/User/UpdateUser'
import LoginPage from './Pages/User/LoginPage'
import PrivateWrapper from './components/PrivateWrapper'
import { AppShell, BackgroundImage, Image, Burger, Group, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './styles/Header.module.css';
import { Link } from 'react-router-dom';
import { useContext, useState } from "react";              
import { AuthContext } from "./context/auth.context";
import { IconHomeHeart } from '@tabler/icons-react'
import Dashboard from './Pages/Dashboard'
import GuestWrapper from './components/GuestWrapper'
import PublicProfile from './Pages/User/PublicProfile'


function App() {
  const [opened, { toggle }] = useDisclosure();
  const [searchBarVisible, setSearchBarVisible] = useState(true);
  const { isLoggedIn, user , logOutUser } = useContext(AuthContext); 

  const location = useLocation();

  return (
    <>
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
      disabled={location.pathname.startsWith('/dashboard')}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
          <Link to='/'><IconHomeHeart size={40} strokeWidth={1} color={'white'} /></Link>
          <UnstyledButton className={classes.control}><Link to="/recipes">Search for recipes</Link></UnstyledButton>
            <Group ml="xl" gap={30} visibleFrom="sm">
              <UnstyledButton className={classes.control}><Link to="/dashboard">Dashboard</Link></UnstyledButton>
              {!isLoggedIn ? (<>
              <UnstyledButton className={classes.control}><Link to="/signup">Signup</Link></UnstyledButton>
              <UnstyledButton className={classes.control}><Link to="/login">Login</Link></UnstyledButton>              
              </>) : (<>
                <UnstyledButton className={classes.control} onClick={logOutUser}><Link>Log out</Link></UnstyledButton>
                {/* <UnstyledButton className={classes.control}><Link>{user.username}</Link></UnstyledButton> */}
              </>)}
              
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
       <UnstyledButton className={classes.control}><Link to="/recipes">Search for recipes</Link></UnstyledButton>
       <UnstyledButton className={classes.control}><Link to="/dashboard">Dashboard</Link></UnstyledButton>
       {!isLoggedIn ? (<>
              <UnstyledButton className={classes.control}><Link to="/signup">Signup</Link></UnstyledButton>
              <UnstyledButton className={classes.control}><Link to="/login">Login</Link></UnstyledButton>              
              </>) : (<>
                <UnstyledButton className={classes.control} onClick={logOutUser}><Link>Log out</Link></UnstyledButton>
                {/* <UnstyledButton className={classes.control}><Link>{user.username}</Link></UnstyledButton> */}
              </>)}
      </AppShell.Navbar>

      <AppShell.Main p={0}>
      <Routes >
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard/*" element={<PrivateWrapper><Dashboard /></PrivateWrapper>} />
        <Route path="/recipes" element= {<PrivateWrapper><AllRecipes /></PrivateWrapper>} />
        {/* <Route path='/recipes/create' element={<PrivateWrapper> <CreateRecipe/> </PrivateWrapper>} /> */}
        <Route path='/recipes/:id' element={<PrivateWrapper> <RecipeDetails/> </PrivateWrapper>} />
        {/* <Route path = '/recipes/:id/edit' element={<PrivateWrapper> <UpdateRecipe/> </PrivateWrapper>}/> */}
        <Route path='/signup' element={<GuestWrapper> <CreateUser/></GuestWrapper>} /> 
        <Route path='/login' element={<GuestWrapper> <LoginPage/></GuestWrapper>} />
        <Route path='profile/:username' element={<PrivateWrapper><PublicProfile /></PrivateWrapper>}/>  
        
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      </AppShell.Main>
    </AppShell>
     
    </>
  )
}

export default App

/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
  IconBowl,
  IconHome2,
  IconMushroomFilled,
  IconGauge,
  IconChefHat,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
  IconCalculator,
  IconHomeHeart,
  IconSearch,
  IconPizza
} from '@tabler/icons-react';
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Navbar.module.css';
import NavbarLink from './NavbarLink';
import { AuthContext } from '../../context/auth.context';



function Navbar( {toggleSearchBar} ) {
  const [active, setActive] = useState(2);

  const { logOutUser } = useContext(AuthContext);


  const handleSearchBarToggle = (label) => {
    if (label.includes('Search')) {
      toggleSearchBar();
    }
  };


  const handleLogout = () => {
      console.log('Logout');
      logOutUser();    
  };

  const linkData = [
    { icon: IconSearch, label: 'Search recipes' },
    { icon: IconMushroomFilled, label: 'Create recipe' ,path:'./recipes/create'},
    { icon: IconBowl, label: 'Recipes' , path:'./recipes'},
    { icon: IconPizza, label: 'Favourites' , path:'./favourites'},
    { icon: IconCalculator, label: 'Calculator' , path:'./calculator'},
    // { icon: IconUser, label: 'Account' , path:'./account'},
    { icon: IconChefHat, label: 'Profile' , path:'./profile'},
    // { icon: IconSettings, label: 'Settings' },
  ];

  const links = linkData.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => 
        {handleSearchBarToggle(link.label)
          setActive(index)}
        }
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>
      <Link to='/'><IconHomeHeart size={40} strokeWidth={1} color={'white'} /></Link>   
      </Center>

      <div className={classes.navbarMain} >
        <Stack justify="space-around" gap={5}>
          {links}
        </Stack>
      </div>
            
      <Stack justify="space-around" gap={2}>
        {/* <NavbarLink icon={IconSwitchHorizontal} label="Change account" /> */}  
        {/* <NavbarLink icon={IconLogout} active={true} onClick={()=>{handleLogout()}} label="Logout" /> */}
      </Stack>      
    </nav>
  );
}

export default Navbar;

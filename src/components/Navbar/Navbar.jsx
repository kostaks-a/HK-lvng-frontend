/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
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



function Navbar( {toggleSearchBar} ) {
  const [active, setActive] = useState(2);

  const handleSearchBarToggle = (label) => {
    if (label.includes('Search')) {
      toggleSearchBar();
    }
    
  };

  const linkData = [
    { icon: IconSearch, label: 'Search recipes' , onClick: handleSearchBarToggle },
    { icon: IconMushroomFilled, label: 'Create recipe' ,path:'./recipes/create'},
    { icon: IconBowl, label: 'Recipes' , path:'./recipes'},
    { icon: IconPizza, label: 'Favourites' },
    { icon: IconCalculator, label: 'Calculator' },
    { icon: IconUser, label: 'Account' },
    { icon: IconChefHat, label: 'Profile' },
    { icon: IconSettings, label: 'Settings' },
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

      <Stack justify="center" gap={0}>
        <NavbarLink icon={IconSwitchHorizontal} label="Change account" />
        <NavbarLink icon={IconLogout} label="Logout" />
      </Stack>
    </nav>
  );
}

export default Navbar;

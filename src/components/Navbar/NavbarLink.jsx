/* eslint-disable react/prop-types */
import { Tooltip, UnstyledButton, rem } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from './Navbar.module.css';

function NavbarLink({ icon: Icon, label, active, onClick , path }) {
    return (
      <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <Link to={path}>
        <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
          <Icon style={{ width: rem(25), height: rem(25) }} stroke={1.5} />
        </UnstyledButton>
      </Link>      
      </Tooltip>
    );
  }

  export default NavbarLink
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { AiFillHome, AiOutlineMenu, AiFillCloseCircle } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'

import { FiChevronLeft, FiChevronRight, FiLogOut } from 'react-icons/fi'
import React from 'react'
import { NavLink } from 'react-router-dom';

const MobileNavigation = () => {
    const [value, setValue] = React.useState(0);

    return (
        <Box sx={{ width: 500 }}>
            <BottomNavigation
                showLabels
            >
                <NavLink to='/'>  <BottomNavigationAction label="Home" icon={<AiFillHome />} /></NavLink>
                <NavLink to='/cart' >  <BottomNavigationAction label="Cart" icon={<FaShoppingCart />} /></NavLink>
                <NavLink to='/logout'>  <BottomNavigationAction label="Logout" icon={<FiLogOut />} /></NavLink>
            </BottomNavigation>
        </Box>
    );
}

export default MobileNavigation
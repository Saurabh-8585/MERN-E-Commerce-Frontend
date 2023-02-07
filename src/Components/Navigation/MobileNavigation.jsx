import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { AiFillHome, AiFillHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaShoppingCart } from 'react-icons/fa'

import { FiChevronLeft, FiChevronRight, FiLogOut } from 'react-icons/fi'
import React from 'react'
import { NavLink } from 'react-router-dom';
import './Mobile.css'
import { Badge } from '@mui/material';

const MobileNavigation = () => {

    return (
        <Box >
            <BottomNavigation showLabels className='nav-items'>
                <NavLink to='/'>
                    <div className='links'>
                        <AiFillHome style={{ fontSize: 23 }} />
                        <span>Home</span>
                    </div>
                </NavLink>
                <NavLink to='/cart'>
                    <div className='links'>
                        <Badge badgeContent={3} color='primary' style={{ color: '#1976d2' }}>
                            <AiOutlineShoppingCart style={{ fontSize: 23 }} />
                        </Badge>
                        <span>Cart</span>
                    </div>
                </NavLink>

                <NavLink to='/whishlist' >
                    <div className='links'>
                        <AiFillHeart style={{ fontSize: 23 }} />
                        <span>Wishlist</span>
                    </div>
                </NavLink>
            </BottomNavigation >
        </Box >
    );
}

export default MobileNavigation
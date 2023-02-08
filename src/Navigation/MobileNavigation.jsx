import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import { AiOutlineHome, AiOutlineHeart, AiOutlineShoppingCart, AiFillMail } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './Mobile.css'
import { Badge } from '@mui/material';
import { ContextFunction } from '../Context/Context';

const MobileNavigation = () => {
    const { cart, setCart } = useContext(ContextFunction)
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const navigate = useNavigate()

    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken !== null ? true : false

    return (
        <Box className='showMobile'>
            <BottomNavigation  sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', position: 'fixed', bottom: 0 }}>
                <NavLink to='/'>
                    <div className='links'>
                        <AiOutlineHome style={{ fontSize: 23, }} />
                        <span>Home</span>
                    </div>
                </NavLink>
                <NavLink to='/cart'>
                    <div className='links'>
                        <Badge badgeContent={setProceed ? 3 : 5} >
                            <AiOutlineShoppingCart style={{ fontSize: 23 }} />
                        </Badge>
                        <span>Cart</span>
                    </div>
                </NavLink>
                <NavLink to='/wishlist' >
                    <div className='links'>
                        <Badge badgeContent={setProceed ? 3 : 10} >
                            <AiOutlineHeart style={{ fontSize: 23, }} />
                        </Badge>
                        <span>Wishlist</span>
                    </div>
                </NavLink>
                {
                    setProceed ?
                        <div className='links' onClick={() => setOpenAlert(true)}>
                            <FiLogOut style={{ fontSize: 23, }} />
                            <span>Logout</span>
                        </div>
                        : <NavLink to='/login' >
                            <div className='links' onClick={() => navigate('/login')}>
                                <CgProfile style={{ fontSize: 23, }} />
                                <span>Login</span>
                            </div>
                        </NavLink>
                }
                <NavLink to='/contact' >
                    <div className='links'>
                        <AiFillMail style={{ fontSize: 23, }} />
                        <span>Contact  </span>
                    </div>
                </NavLink>
            </BottomNavigation >
        </Box >
    );
}

export default MobileNavigation
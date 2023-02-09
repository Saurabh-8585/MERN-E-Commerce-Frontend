import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import { AiOutlineHome, AiOutlineHeart, AiOutlineShoppingCart, AiFillMail, AiFillCloseCircle } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import React, { forwardRef, useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Mobile.css'
import { Badge, Button, Dialog, DialogActions, DialogContent, Slide, Typography } from '@mui/material';
import { ContextFunction } from '../Context/Context';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const MobileNavigation = () => {
    const { cart, setCart, wishlistData, setWishlistData } = useContext(ContextFunction)
    const [openAlert, setOpenAlert] = useState(false);
    const navigate = useNavigate()

    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken !== null ? true : false

    useEffect(() => {
        getCart()
        getWishList()
    }, [])
    const getCart = async () => {
        if (setProceed) {
            const { data } = await axios.get(`${process.env.REACT_APP_GET_CART}`,
                {
                    headers: {
                        'Authorization': authToken
                    }
                })
            setCart(data);
        }
    }
    const getWishList = async () => {
        if (setProceed) {
            const { data } = await axios.get(`${process.env.REACT_APP_GET_WISHLIST}`,
                {
                    headers: {
                        'Authorization': authToken
                    }
                })
            setWishlistData(data)
        }
    }
    const handleClickOpen = () => {
        setOpenAlert(true);
    };

    const handleClose = () => {
        setOpenAlert(false);
    };
    const handleLogOut = () => {
        if (setProceed) {
            localStorage.removeItem('Authorization')
            toast.success("Logout Successfully", { autoClose: 500, })
            navigate('/ ')
            setOpenAlert(false);
        }
        else {
            toast.error("User is already logged of", { autoClose: 500, })
        }
    }

    return (
        <Box className='showMobile'>
            <ToastContainer />
            <BottomNavigation sx={{ display: 'flex', justifyContent: 'space-around', width: '100%', position: 'fixed', bottom: 0 }}>
                <NavLink to='/'>
                    <div className='links'>
                        <AiOutlineHome style={{ fontSize: 23, }} />
                        <span>Home</span>
                    </div>
                </NavLink>
                <NavLink to='/cart'>
                    <div className='links'>
                        <Badge badgeContent={setProceed ? cart.length : 0} >
                            <AiOutlineShoppingCart style={{ fontSize: 23 }} />
                        </Badge>
                        <span>Cart</span>
                    </div>
                </NavLink>
                <NavLink to='/wishlist' >
                    <div className='links'>
                        <Badge badgeContent={setProceed ? wishlistData.length : 0} >
                            <AiOutlineHeart style={{ fontSize: 23, }} />
                        </Badge>
                        <span>Wishlist</span>
                    </div>
                </NavLink>
                {
                    setProceed ?
                        <div className='links' onClick={ handleClickOpen}>
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
            <Dialog
                open={openAlert}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 }, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant='h6'>  Do You Want To Logout?</Typography>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button variant='contained' endIcon=<FiLogOut /> color='primary' onClick={handleLogOut}>Logout</Button>
                    <Button variant='contained' color='error' endIcon=<AiFillCloseCircle /> onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}

export default MobileNavigation
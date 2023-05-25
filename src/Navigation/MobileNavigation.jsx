import './Mobile.css'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import { AiOutlineHome, AiOutlineHeart, AiOutlineShoppingCart, AiFillMail, AiFillCloseCircle } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import React, {  useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Badge, Button, Dialog, DialogActions, DialogContent, Slide, Typography } from '@mui/material';
import { ContextFunction } from '../Context/Context';
import { toast } from 'react-toastify';
import { Transition, getCart, getWishList, handleClickOpen, handleClose, handleLogOut } from '../Constants/Constant';


const MobileNavigation = () => {
    const { cart, setCart, wishlistData, setWishlistData } = useContext(ContextFunction)
    
    const [openAlert, setOpenAlert] = useState(false);

    const navigate = useNavigate()

    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken !== null ? true : false

    useEffect(() => {
        getCart(setProceed, setCart, authToken)
        getWishList(setProceed, setWishlistData, authToken)
    }, [])

    return (
        <Box className='showMobile'>
            <BottomNavigation sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', position: 'fixed', bottom: 0, overflowX: 'hidden', height: 60, background: 'white' }}>
                <NavLink to='/' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <div className='links'>
                        <AiOutlineHome style={{ fontSize: 23, }} />
                    </div>
                </NavLink>
                <NavLink to='/cart' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                    <div className='links'>
                        <Badge badgeContent={setProceed ? cart.length : 0} >
                            <AiOutlineShoppingCart style={{ fontSize: 23 }} />
                        </Badge>
                    </div>
                </NavLink>
                <NavLink to='/wishlist' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}  >
                    <div className='links' >
                        <Badge badgeContent={setProceed ? wishlistData.length : 0} >
                            <AiOutlineHeart style={{ fontSize: 23, }} />
                        </Badge>
                    </div>
                </NavLink>


                {
                    setProceed ?
                        <>
                            <NavLink to='/update' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                                <div className='links'>
                                    <CgProfile style={{ fontSize: 23, }} />

                                </div>
                            </NavLink>
                            <div className='links' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => handleClickOpen(setOpenAlert)}>
                                <FiLogOut style={{ fontSize: 23, }} />

                            </div>
                        </>
                        : <NavLink to='/login' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                            <div className='links'>
                                <CgProfile style={{ fontSize: 23, }} />
                                {/* <span style={{ fontSize: 12 }}>Login</span> */}
                            </div>
                        </NavLink>
                }

            </BottomNavigation >
            <Dialog
                open={openAlert}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => handleClose(setOpenAlert)}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 }, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant='h6'>  Do You Want To Logout?</Typography>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button variant='contained' endIcon={<FiLogOut />} color='primary' onClick={() => handleLogOut(setProceed, toast, navigate, setOpenAlert)}>Logout</Button>
                    <Button variant='contained' color='error' endIcon={<AiFillCloseCircle />} onClick={()=>handleClose(setOpenAlert)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box >
    );
}


export default MobileNavigation
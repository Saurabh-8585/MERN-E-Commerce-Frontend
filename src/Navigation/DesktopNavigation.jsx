import './Desktop.css'
import React, { forwardRef, useContext, useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlineShoppingCart, AiFillCloseCircle } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Badge, Button, Dialog, DialogActions, DialogContent, Slide, Tooltip, Typography } from '@mui/material';
import { ContextFunction } from '../Context/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const DesktopNavigation = () => {

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
  const handleLogOut = () => {
    if (setProceed) {
      localStorage.removeItem('Authorization')
      toast.success("Logout Successfully", { autoClose: 500, })
      navigate('/')
      setOpenAlert(false)
    }
    else {
      toast.error("User is already logged of", { autoClose: 500, })
    }
  }

  const handleClickOpen = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpenAlert(false);
  };


  return (
    <>
      <nav className='nav'>
        <ToastContainer />
        <div className="logo">
          <h1 >Shop It</h1>
        </div>
        <ul className="nav-items">
          <li className="nav-links">
            <NavLink to='/'>
              <span className='nav-icon-span'>  Home</span>
            </NavLink>
          </li>
          <li className="nav-links">
            <NavLink to='/contact'>
              <span className='nav-icon-span'>  Contact Us</span>
            </NavLink>
          </li>

          <li className="nav-links">
            <Tooltip title='Cart'>
              <NavLink to='/cart'>
                <span className='nav-icon-span'>    <Badge badgeContent={setProceed ? cart.length : 0}> <AiOutlineShoppingCart className='nav-icon' /></Badge></span>
              </NavLink>
            </Tooltip>
          </li>

          <li className="nav-links">
            <Tooltip title='Wishlist'>
              <NavLink to='/wishlist'>
                <span className='nav-icon-span'>    <Badge badgeContent={wishlistData.length}> <AiOutlineHeart className='nav-icon' /></Badge></span>
              </NavLink>
            </Tooltip>
          </li>
          {
            setProceed ?
              <li className="nav-links" onClick={handleClickOpen}>
                <Tooltip>
                  <span className='nav-icon-span'>Logout     <FiLogOut className='nav-icon' /></span>
                </Tooltip>
              </li>
              :
              <li className="nav-links">
                <Tooltip title='Login'>
                  <NavLink to='/login'>
                    <span className='nav-icon-span'>   <CgProfile style={{ fontSize: 29 }} /></span>
                  </NavLink>
                </Tooltip>
              </li>
          }
        </ul>
      </nav >
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
          <Link to="/">
            <Button variant='contained' endIcon=<FiLogOut /> color='primary' onClick={handleLogOut}>Logout</Button></Link>
          <Button variant='contained' color='error' endIcon=<AiFillCloseCircle /> onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>

  )
}

export default DesktopNavigation
import './Desktop.css'
import React, { forwardRef, useContext, useEffect, useState } from 'react'
import { AiOutlineHeart, AiOutlineShoppingCart, AiFillCloseCircle } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Badge, Button, Dialog, DialogActions, DialogContent, Menu, MenuItem, Slide, Tooltip, Typography } from '@mui/material';
import { ContextFunction } from '../Context/Context';
import { toast } from 'react-toastify';
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
      toast.success("Logout Successfully", { autoClose: 500, theme: 'colored' })
      navigate('/')
      setOpenAlert(false)
    }
    else {
      toast.error("User is already logged of", { autoClose: 500, theme: 'colored' })
    }
  }

  const handleClickOpen = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpenAlert(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopUpClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <nav className='nav'>
        <div className="logo">
          <span >Shop It</span>
        </div>
        <div className="nav-items">
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
                  <span className='nav-icon-span'>    <Badge badgeContent={setProceed ? wishlistData.length : 0}> <AiOutlineHeart className='nav-icon' /></Badge></span>
                </NavLink>
              </Tooltip>
            </li>

            { }
            {
              setProceed ?
                <>
                  <li className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title='Profile'>
                      <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                      >
                        <span className='nav-icon-span'>   <CgProfile style={{ fontSize: 29, color: 'black', marginTop: 7 }} /></span>
                      </Button>
                    </Tooltip>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handlePopUpClose}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <Link to='/update'>   <MenuItem onClick={handlePopUpClose}>Update Profile</MenuItem></Link>
                      <MenuItem className='fx' onClick={handleClickOpen}>Logout</MenuItem>
                    </Menu>
                  </li>

                  <li style={{ display: 'flex', alignItems: 'center' ,justifyItems:'center'}} onClick={handleClickOpen}>
                    <Tooltip>
                      <Button variant='contained' className='nav-icon-span' sx={{marginBottom:1 }} endIcon ={<FiLogOut/>}>
                        <Typography variant='button'> Logout</Typography>
                      </Button>
                    </Tooltip>
                  </li>
                </>
                :
                <li className="nav-links">
                  <Tooltip title='Login'>
                    <NavLink to='/login'>
                      <span className='nav-icon-span'>   <CgProfile style={{ fontSize: 29,marginTop:7 }} /></span>
                    </NavLink>
                  </Tooltip>
                </li>
            }
          </ul>
        </div>
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
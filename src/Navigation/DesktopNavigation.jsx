import './Desktop.css'
import React, { useContext, useState } from 'react'
import {  AiOutlineHeart, AiOutlineShoppingCart } from 'react-icons/ai'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { NavLink, useNavigate } from 'react-router-dom';
import { Badge, Tooltip } from '@mui/material';
import { ContextFunction } from '../Context/Context';
const DesktopNavigation = () => {
  const { cart, setCart } = useContext(ContextFunction)
  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate()

  let authToken = localStorage.getItem('Authorization')
  let setProceed = authToken !== null ? true : false

  return (
    <nav className='nav'>
      <div className="logo">
        <h1>Shop It</h1>
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
              <span className='nav-icon-span'>    <Badge badgeContent={3}> <AiOutlineShoppingCart className='nav-icon' /></Badge></span>
            </NavLink>
          </Tooltip>
        </li>

        <li className="nav-links">
          <Tooltip title='Wishlist'>
            <NavLink to='/wishlist'>
              <span className='nav-icon-span'>    <Badge badgeContent={3}> <AiOutlineHeart className='nav-icon' /></Badge></span>
            </NavLink>
          </Tooltip>
        </li>
        {
          setProceed ?
            <li className="nav-links" onClick={() => setOpen(true)}>
              <Tooltip>
                <NavLink to='/login'>
                  <span className='nav-icon-span'>Logout     <FiLogOut className='nav-icon' /></span>
                </NavLink>
              </Tooltip>
            </li>
            :
            <li className="nav-links">
              <Tooltip title='Login'>
                <NavLink to='/wishlist'>
                  <span className='nav-icon-span'>   <CgProfile style={{ fontSize: 29 }} /></span>
                </NavLink>
              </Tooltip>
            </li>
        }
      </ul>

    </nav >
  )
}

export default DesktopNavigation
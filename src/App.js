import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage';
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register';
import SideBar from './Components/Sidebar/SideBar';
import Cart from './Pages/Cart/Cart';
import ProductDetail from './Pages/Detail/ProductDetail';
import SingleCategory from './SingleCategory/SingleCategory';
import { Box } from '@mui/system';



function App() {







  return (
    <>
      <Router>
        <Box sx={{ display: 'flex' }}>
          {<SideBar />}
          <Routes>
            <Route path="/login" element={< Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/Detail/type/:cat/:id' element={<ProductDetail />} />
            <Route path='product/type/:cat' element={<SingleCategory />} />
            <Route path='/cart' element={<Cart />} />


          </Routes>
        </Box>
      </Router >


    </>
  );
}
export default App;

import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage';
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register';
import Cart from './Pages/Cart/Cart';
import ProductDetail from './Pages/Detail/ProductDetail';
import SingleCategory from './SingleCategory/SingleCategory';
import MobileNavigation from './Navigation/MobileNavigation';
import DesktopNavigation from './Navigation/DesktopNavigation';
import Wishlist from './Pages/WhisList/Wishlist';



function App() {







  return (
    <>
      <Router>
        {/* <Box sx={{ display: 'flex' }}> */}
        {/* {<SideBar />} */}
        <DesktopNavigation />
        <Routes>
          <Route path="/login" element={< Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/Detail/type/:cat/:id' element={<ProductDetail />} />
          <Route path='product/type/:cat' element={<SingleCategory />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/wishlist' element={<Wishlist />} />


        </Routes>
        <MobileNavigation />
        {/* </Box> */}
      </Router >


    </>
  );
}
export default App;

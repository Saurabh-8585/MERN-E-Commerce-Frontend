import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage';
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register';
import Cart from './Pages/Cart/Cart';
import ProductDetail from './Pages/Detail/ProductDetail';
import SingleCategory from './SingleCategory/SingleCategory';
import MobileNavigation from './Navigation/MobileNavigation';
import DesktopNavigation from './Navigation/DesktopNavigation';
import Wishlist from './Pages/WhisList/Wishlist';
import { Box } from '@mui/system';
import MTable from './Pages/Cart/CartTable';



function App() {







  return (
    <>
      <Router>
        {/* <Box sx={{ display: 'flex' }}> */}
        {/* {<SideBar />} */}
        <DesktopNavigation />
        <Box sx={{marginTop:20}}>
          <Routes>
            <Route path="/login" element={< Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/Detail/type/:cat/:id' element={<ProductDetail />} />
            <Route path='product/type/:cat' element={<SingleCategory />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/table' element={<MTable />} />


          </Routes>
        </Box>
        <MobileNavigation />
        {/* </Box> */}
      </Router >


    </>
  );
}
export default App;

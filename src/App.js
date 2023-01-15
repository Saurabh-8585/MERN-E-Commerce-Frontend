import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage';
import Login from './Auth/Login';
import Register from './Auth/Register';
import SideBar from './Components/Sidebar/SideBar';
import { Box } from '@mui/system';
import Cart from './Pages/Cart/Cart';
import ProductDetail from './Pages/Detail/ProductDetail';
import SingleCategory from './SIngleCategory/SingleCategory';
function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        {<SideBar />} 
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/Detail/:id' element={<ProductDetail />} />
          <Route path='product/type/:cat' element={<SingleCategory />} />
          <Route path='/cart' element={<Cart />} />

        </Routes>
      </Box>
    </Router >
  );
}
export default App;

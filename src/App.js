import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './Pages/Home/HomePage';
import Login from './Auth/Login/Login';
import Register from './Auth/Register/Register';
import SideBar from './Components/Sidebar/SideBar';
import { Box } from '@mui/system';
import Cart from './Pages/Cart/Cart';
import ProductDetail from './Pages/Detail/ProductDetail';
import SingleCategory from './SingleCategory/SingleCategory';
function App() {
  let authToken = localStorage.getItem('Authorization')

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        {<SideBar />}
        <Routes>
          <Route path={authToken === null ? "/login" : "/"} element={authToken === null ? < Login /> : <HomePage />} />
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

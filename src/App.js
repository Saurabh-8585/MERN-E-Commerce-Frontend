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
import PaymentSuccess from './Pages/Payment/PaymentSuccess';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckoutForm from './Components/Checkout/CheckoutForm';
import UpdateDetails from './Pages/Update_User/UpdateDetails';
import ForgotPasswordForm from './Auth/ForgotPassword/ForgotPasswordForm';
import AddNewPassword from './Auth/ForgotPassword/AddNewPassword';





function App() {
  return (
    <>
      <ToastContainer toastClassName='toastContainerBox' />
      <Router>
        <DesktopNavigation />
        <div className='margin'>
          <Routes>
            <Route path='/' index element={<HomePage />} />
            <Route path="/login" element={< Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/Detail/type/:cat/:id' element={<ProductDetail />} />
            <Route path='product/type/:cat' element={<SingleCategory />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/wishlist' element={<Wishlist />} />
            <Route path='/checkout' element={<CheckoutForm />} />
            <Route path='/update' element={<UpdateDetails />} />
            <Route path='/paymentsuccess' element={<PaymentSuccess />} />
            <Route path='/forgotpassword' element={<ForgotPasswordForm />} />
            <Route path='/user/reset/:id/:token' element={<AddNewPassword />} />
          </Routes>
        </div>
        <MobileNavigation />
      </Router >


    </>
  );
}
export default App;

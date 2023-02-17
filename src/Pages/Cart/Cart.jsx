import React, { forwardRef, useContext, useEffect, useState } from 'react'
import { ContextFunction } from '../../Context/Context';
import {
    Box,
    Button,
    CardActionArea,
    CardContent,
    Tooltip,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    Slide,
    IconButton,
    Container,
} from '@mui/material'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AiFillCloseCircle, AiOutlineLogin, AiFillInfoCircle } from 'react-icons/ai'
import { IoBagCheckOutline } from 'react-icons/io5'
import CartCard from '../../Components/Card/CartCard/CartCard';
import profileImg from '../../Assets/Banner/vecteezy_user-avatar-line-style_.jpg'
import ProductCard from '../../Components/Card/Product Card/ProductCard';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const Cart = () => {
    const { cart, setCart } = useContext(ContextFunction)
    const [total, setTotal] = useState(0)
    const [shippingCost, setShippingCoast] = useState(100)
    const [openAlert, setOpenAlert] = useState(false);
    const [previousOrder, setPreviousOrder] = useState([]);
    const navigate = useNavigate()

    let shipping = total >= 1000 ? 0 : shippingCost
    let totalCost = cart.length == 0 ? 0 : total + shipping
    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken ? true : false


    useEffect(() => {
        setProceed ? getCart() : setOpenAlert(true)
        getPreviousOrder()
        window.scroll(0, 0)

    }, [])

    useEffect(() => {
        setProceed && setTotal(cart.reduce((acc, curr) => acc + (curr.productId?.price), 0))
    }, [cart])

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
    const handleClose = () => {
        setOpenAlert(false);
        navigate('/')
    };
    const handleToLogin = () => {
        navigate('/login')
    };


    const removeFromCart = async (product) => {
        if (setProceed) {
            const response = await axios.delete(`${process.env.REACT_APP_DELETE_CART}/${product.productId._id}`, {
                headers: {
                    'Authorization': authToken
                }
            })
            toast.error("Removed From Cart", { autoClose: 500, theme: 'colored' })
            getCart()
        }
    }



    const checkoutHandler = async () => {
        const { data: { key } } = await axios.get(`${process.env.REACT_APP_GET_KEY}`)
        const { data } = await axios.post(`${process.env.REACT_APP_GET_CHECKOUT}`, {
            amount: 1,
            productDetails: JSON.stringify(cart),
            userId: cart[0]?.user?._id,
        })

        const options = {
            key: key,
            amount: 1,
            currency: "INR",
            name: cart[0]?.user?.name,
            description: "Payment",
            image: profileImg,
            order_id: data.order.id,
            callback_url: process.env.REACT_APP_GET_PAYMENTVERIFICATION,
            prefill: {
                name: cart[0]?.user?.name,
                email: cart[0]?.user?.email,
                contact: "7020409952"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#1976d2"
            },

        };
        const razor = new window.Razorpay(options);
        razor.open();
    }

    const getPreviousOrder = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_GET_PREVIOUS_ORDER}`,
            {
                headers: {
                    'Authorization': authToken
                }
            })
        setPreviousOrder(data)
    }
    console.log(previousOrder);

    return (
        <div className='main-cart-container'>
            {setProceed &&
                <>


                    {
                        cart.map(product =>
                            <CartCard product={product} removeFromCart={removeFromCart} key={product._id} />

                        )}

                    <Box className='total-card'>
                        <CardActionArea >
                            <CardContent>
                                <span> Total Amount =  ₹{total} </span>
                                <br />
                                <span> Shipping Cost = ₹{cart.length === 0 ? 0 : shipping}   </span>
                                <Tooltip title="There will no shipping charge If total order is greater than ₹1000" placement="right-start">

                                    <IconButton>
                                        <AiFillInfoCircle color='#1976d2' />
                                    </IconButton>
                                </Tooltip>

                                <br />
                                <span>Bill Amount = ₹ {totalCost}</span>
                            </CardContent>
                        </CardActionArea>
                    </Box>
                    <Button variant='contained' onClick={checkoutHandler} endIcon=<IoBagCheckOutline /> >  Proceed To Checkout</Button>
                    <Container maxWidth='xl' style={{ marginTop: 90, display: "flex", justifyContent: 'center', flexWrap: "wrap", paddingBottom: 20 }}>
                        {previousOrder.map(product => (
                            product.productData.map(prod =>
                                <Link to={`/Detail/type/${prod.productId.type}/${prod.productId._id}`} key={prod.productId._id}>
                                    <ProductCard prod={prod.productId} />
                                </Link>
                            )
                        ))}
                    </Container>
                </>
            }
            <Dialog
                open={openAlert}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 }, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant='h5'> Please Login To Proceed</Typography>
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Button variant='contained' onClick={handleToLogin} endIcon=<AiOutlineLogin /> color='primary'>Login</Button>
                    <Button variant='contained' color='error' endIcon=<AiFillCloseCircle /> onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default Cart
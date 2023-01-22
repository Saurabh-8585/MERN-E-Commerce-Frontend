import './Productsimilar.css'
import React, { useEffect, useState, useContext, forwardRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
    Box,
    Button,
    Container,
    Tooltip,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
} from '@mui/material';
import Slide from '@mui/material/Slide';
import { MdAddShoppingCart } from 'react-icons/md'
import { AiFillCloseCircle, AiOutlineLogin } from 'react-icons/ai'
import axios from 'axios';







import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextFunction } from '../../Context/Context';
import ProductCard from '../../Components/Card/ProductCard';


const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDetail = () => {
    const { cart, setCart } = useContext(ContextFunction)
    const [openAlert, setOpenAlert] = useState(false);
    const { id, cat } = useParams()
    const [product, setProduct] = useState([])
    const [similarProduct, setSimilarProduct] = useState([])
    console.log(cat);
    let authToken = localStorage.getItem('Authorization')
    let proceed = false
    let setProceed = authToken !== null ? proceed = true : proceed = false


    const getProduct = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_FETCH_PRODUCT}/${id}`)
        setProduct(data)
    }
    useEffect(() => {
        getProduct()
        getSimilarProducts()
    }, [])


    const addToCart = async (product) => {
        if (setProceed) {
            const { data } = await axios.post(`${process.env.REACT_APP_ADD_CART}`, product, {
                headers: {
                    'Authorization': authToken
                }
            })
            setCart(data)
            toast.success("Added To Cart", { autoClose: 500, })
            setCart([...cart, product])
        }
    }
    const getSimilarProducts = async () => {
        const { data } = await axios.post(`${process.env.REACT_APP_PRODUCT_TYPE}`, { userType: cat })
        setSimilarProduct(data)
    }
    const handleClickOpen = () => {
        setOpenAlert(true);
        console.log(1);
    };

    const handleClose = () => {
        setOpenAlert(false);
    };
    return (
        <>
            <Container maxWidth='xl' sx={{ background: "", marginTop: 20 }}>
                <Dialog
                    open={openAlert}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
                    <DialogContent sx={{ width: { xs: 280, md: 350, xl: 400 } }}>
                        <DialogContentText id="alert-dialog-slide-description">
                            Please Login To Proceed
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                        <Link to="/login"> <Button variant='contained' endIcon=<AiOutlineLogin /> color='primary'>Login</Button></Link>
                        <Button variant='contained' color='error' endIcon=<AiFillCloseCircle /> onClick={handleClose}>Close</Button>
                    </DialogActions>
                </Dialog>


                <Typography variant='body1'>{product.name}</Typography>
                <Box className='img-box'  >
                    <img alt={product.name} src={product.image} className='img' />
                </Box>
                <Box>
                    <Tooltip title='Add To Cart'>
                        <Button variant='contained' startIcon={<MdAddShoppingCart />} onClick={setProceed ? (() => addToCart(product)) : (handleClickOpen)}>Buy</Button>
                    </Tooltip>
                </Box>

                <Typography sx={{ marginTop: 10, marginBottom: 5 }}>Similar Products</Typography>
                <Box>
                    <Box className='similarProduct' sx={{ display: 'flex', overflowX: 'auto' }}>
                        {
                            similarProduct.map(prod => (
                                <Link to={`/Detail/type/${prod.type}/${prod._id}`} key={prod._id}>
                                    <ProductCard prod={prod} />
                                </Link>
                            ))
                        }
                    </Box>
                </Box>
                <ToastContainer />
            </Container >
        </>
    )
}

export default ProductDetail
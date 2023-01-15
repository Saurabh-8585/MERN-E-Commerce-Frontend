import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Box, Button, Container, Typography } from '@mui/material';
import { MdAddShoppingCart } from 'react-icons/md'
import axios from 'axios';
import { ContextFunction } from '../../Context/Context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductDetail = () => {
    const { cart, setCart } = useContext(ContextFunction)
    const { id } = useParams()
    const [product, setProduct] = useState([])
    const getProduct = async () => {
        const response = await axios.get(`${process.env.REACT_APP_FETCH_PRODUCT}/${id}`)
        setProduct(response.data)
    }
    useEffect(() => {
        getProduct()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const addToCart = async (product) => {
        // const { name, description, price, rating, image, _id } = product

        const response = await axios.post(`${process.env.REACT_APP_ADD_CART}`, product, {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhMDBjNGM0NTRiNDM5MTJjOTllY2JlIn0sImlhdCI6MTY3MTQzMzMyMX0._y5gcnwfNGlv9Uc2Hfqm7c_uwjaJiWn2XG0sSV-mGXg'
            }
        })
        setCart(response.data)
        console.log("added cart", cart);
        toast.success("Added To Cart", { autoClose: 500, })
        setCart([...cart, product])
    }
    return (
        <Container maxWidth='xl' sx={{ background: "", marginTop: 20 }}>
            <Typography variant='body1'>{product.name}</Typography>
            <Box className='img-box'  >
                <img alt={product.name} src={product.image} className='img' />
            </Box>
            <Box>
                 <Button variant='contained' startIcon={<MdAddShoppingCart />} onClick={() => addToCart(product)}>Buy</Button>
            </Box>
            <ToastContainer />
        </Container>
    )
}

export default ProductDetail
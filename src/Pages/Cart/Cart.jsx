import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import Rating from '../../Components/Rating';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { ContextFunction } from '../../Context/Context'
import { AiFillDelete } from 'react-icons/ai'

const Cart = () => {
    const { cart, setCart } = useContext(ContextFunction)
    const [total, setTotal] = useState()
    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + (curr.price), 0))
    }, [cart])
    console.log(total);
    useEffect(() => {
        getCart()
        window.scroll(0, 0)
    }, [])
    const getCart = async () => {
        const response = await axios.get(process.env.REACT_APP_GET_CART, {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhMDBjNGM0NTRiNDM5MTJjOTllY2JlIn0sImlhdCI6MTY3MTQzMzMyMX0._y5gcnwfNGlv9Uc2Hfqm7c_uwjaJiWn2XG0sSV-mGXg'
            }
        })
        setCart(response.data)
    }

    const removeFromCart = async (product) => {
        const response = await axios.delete(`${process.env.REACT_APP_DELETE_CART}/${product.productId}`, {
            headers: {
                'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhMDBjNGM0NTRiNDM5MTJjOTllY2JlIn0sImlhdCI6MTY3MTQzMzMyMX0._y5gcnwfNGlv9Uc2Hfqm7c_uwjaJiWn2XG0sSV-mGXg'
            }
        })
        toast.error("Removed From Cart", { autoClose: 500, })
        getCart()
    }
    console.log("cart page  ", cart);
    return (
        <div style={{ marginTop: 90, display: "flex", flexWrap: "wrap" }}>
            {cart.map(prod => <Card sx={{ width: 300, margin: "30px 10px 0 10px" }}>

                <Link to={`/Detail/${prod.productId}`} key={prod.productId}>

                    <CardActionArea>
                        <Box className='img-box'  >
                            <CardMedia
                                component="img"
                                height="100%"
                                width="100%"
                                alt={prod.name}
                                src={prod.image}
                                className='img'

                            />
                        </Box>
                        <CardContent>
                            <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                                {prod.name}
                            </Typography>
                            <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                                ₹{prod.price}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <CardActions style={{ display: "flex", justifyContent: "space-around" }}>
                    <Button variant='contained' color='error' onClick={() => removeFromCart(prod)} endIcon={<AiFillDelete />} >Remove</Button>
                    <Typography variant="body2" color="text.secondary">
                        <Rating rating={prod.rating} />
                    </Typography>
                </CardActions>
                <ToastContainer />
            </Card >)}
        </div>
    )
}

export default Cart
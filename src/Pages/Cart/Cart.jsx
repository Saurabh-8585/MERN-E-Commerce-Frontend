import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Tooltip, Typography } from '@mui/material'
import Rating from '../../Components/Rating';
import axios from 'axios'
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { ContextFunction } from '../../Context/Context'
import { AiFillDelete } from 'react-icons/ai'

const Cart = () => {
    const { cart, setCart } = useContext(ContextFunction)
    const [total, setTotal] = useState()
    const [isReadMode, SetisReadMode] = useState(true)

    useEffect(() => {
        setTotal(cart.reduce((acc, curr) => acc + (curr.price), 0))
    }, [cart])
    console.log(total);
    useEffect(() => {
        getCart()
        window.scroll(0, 0)
    }, [])
    let authToken = localStorage.getItem('Authorization')

    const getCart = async () => {
        const response = await axios.get(process.env.REACT_APP_GET_CART, {
            headers: {
                'Authorization': authToken
            }
        })
        setCart(response.data)
    }

    const removeFromCart = async (product) => {
        const response = await axios.delete(`${process.env.REACT_APP_DELETE_CART}/${product.productId}`, {
            headers: {
                'Authorization': authToken
            }
        })
        toast.error("Removed From Cart", { autoClose: 500, })
        getCart()
    }
    console.log("cart page  ", cart);
    return (
        <div style={{ marginTop: 90, display: "flex", flexWrap: "wrap" }}>
            <ToastContainer />
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
                                {isReadMode ? prod.name.slice(0, 20) : prod.name}
                                {
                                    prod.name.length > 15 &&
                                    <span
                                        onClick={() => SetisReadMode(!isReadMode)}>
                                        {isReadMode ? "..." : ""}
                                    </span>
                                }
                            </Typography>
                            <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                                ₹{prod.price}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
                <CardActions style={{ display: "flex", justifyContent: "space-around" }}>
                    <Tooltip title='Remove From Cart'>
                        <Button variant='contained' color='error' onClick={() => removeFromCart(prod)} endIcon={<AiFillDelete />} >Remove</Button>
                    </Tooltip>
                    <Typography variant="body2" color="text.secondary">
                        <Rating rating={prod.rating} />
                    </Typography>
                </CardActions>
            </Card >)}
        </div>
    )
}

export default Cart
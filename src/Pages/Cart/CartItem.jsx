import { useContext, useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Rating from '../../Components/Rating';
import { Box } from '@mui/system';
import { MdRemoveShoppingCart } from 'react-icons/md'
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContextFunction } from '../../Context/Context';
import axios from 'axios';


export default function CartItem({ prod }) {
    const { cart, setCart, addToCart } = useContext(ContextFunction)
    const [isReadMode, SetisReadMode] = useState(true)
    useEffect(() => {
        getCart()
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
       
        // setCart(cart.filter(c => c.id !== product.id))
        toast.error("Removed From Cart", { autoClose: 500, })
        console.log("removed cart", cart);
        getCart()
    }

    return (
        <Card sx={{ width: 300, margin: "30px 10px 0 10px" }}>
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
                {/* <Typography variant="h6" color="primary">
                   
                </Typography> */}
                <Button variant='contained' color='error' onClick={() => removeFromCart(prod)} endIcon={<MdRemoveShoppingCart />} >Remove</Button>
                <Typography variant="body2" color="text.secondary">
                    <Rating rating={prod.rating} />
                </Typography>
            </CardActions>
            <ToastContainer />
        </Card >
    );
}
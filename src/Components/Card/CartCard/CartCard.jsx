import { Button, Card, CardActionArea, CardActions, CardContent, Rating, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { Link } from 'react-router-dom'
import { AiFillDelete } from 'react-icons/ai'
import styles from './CartCard.module.css'
const CartCard = ({ product, removeFromCart }) => {


    return (
        <Card className={styles.main_cart}>
            <Link to={`/Detail/type/${product?.productId?.type}/${product?.productId?._id}`}>
            <CardActionArea className={styles.card_action} >
                <Box className={styles.img_box}  >
                        <img alt={product?.productId?.name} loading='lazy' src={product?.productId?.image} className={styles.img} />
                </Box>
                <CardContent>
                    <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                        {product?.productId?.name.length > 20 ? product?.productId?.name.slice(0, 20) + '...' : product?.productId?.name}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            // background: 'red',
                            justifyContent:'center',
                            '& > *': {
                                m: 1,
                            },
                        }}
                    >
                        {product.quantity && <Button>  <Typography variant='body2' color='black'>  Quantity {' ' + product.quantity} </Typography></Button>}
                        <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                            ₹{product?.productId?.price}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
            </Link>
            <CardActions style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                <Tooltip
                    title='Remove From Cart'>
                    <Button className='all-btn' sx={{ width: 10, borderRadius: '30px' }} variant='contained' color='error' onClick={() => removeFromCart(product)}>
                        <AiFillDelete style={{ fontSize: 15 }} />
                    </Button>
                </Tooltip>
                <Typography> <Rating name="read-only" value={Math.round(product?.productId?.rating)} readOnly  precision={0.5}/></Typography>
            </CardActions>
        </Card >
    )
}

export default CartCard
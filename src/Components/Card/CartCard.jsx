import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Rating, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AiFillDelete } from 'react-icons/ai'

const CartCard = ({ product, removeFromCart }) => {
    const [isReadMode, SetisReadMode] = useState(true)
    return (
        <Card className='main-card' >

            <Link to={`/Detail/type/${product?.productId?.type}/${product?.productId?._id}`}>
                <CardActionArea>
                    <Box className='img-box'  >
                        <CardMedia
                            component="img"
                            alt={product?.productId?.name}
                            src={product?.productId?.image}
                            className='img'

                        />
                    </Box>
                    <CardContent>
                        <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                            {isReadMode ? product?.productId?.name.slice(0, 20) : product?.productId?.name}
                            {
                                product?.productId?.name.length > 15 &&
                                <span
                                    onClick={() => SetisReadMode(!isReadMode)}>
                                    {isReadMode ? "..." : ""}
                                </span>
                            }
                        </Typography>
                        <Typography gutterBottom variant="h6" sx={{ textAlign: "center" }}>
                            ₹{product?.productId?.price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <CardActions style={{ display: "flex", justifyContent: "space-between", width: '100%' }}>
                <Tooltip
                    title='Remove From Cart'>
                    <Button className='all-btn' variant='contained' color='error' onClick={() => removeFromCart(product)} endIcon={<AiFillDelete />} >Remove</Button>
                </Tooltip>
                <Typography> <Rating name="read-only" value={Math.round(product?.productId?.rating)} readOnly /></Typography>
            </CardActions>
        </Card >
    )
}

export default CartCard
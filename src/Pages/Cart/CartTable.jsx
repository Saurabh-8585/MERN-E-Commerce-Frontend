import React from 'react';
import {
    TableCell,
    TableRow,
    Grid,
    Typography,
    Tooltip,
    Button
} from '@mui/material';
import { Link } from 'react-router-dom'
import { AiFillDelete } from 'react-icons/ai'
const CartTable = ({ product, removeFromCart }) => {
    let date = new Date(product.createdAt).toLocaleDateString()
    
    return (
        <TableRow key={product?.productId?.name} >

            <TableCell sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Grid container>
                    <Grid item lg={2} >
                        <Link to={`/Detail/type/${product?.productId?.type}/${product?.productId?._id}`}>
                            <div className="cart-img-box">
                                {/* <CardMedia
                                    component="img"
                                    alt={product?.productId?.name}
                                    src={product?.productId?.image}
                                    className='cart-img'

                                /> */}
                                <img src={product?.productId?.image} alt={product?.productId?.name} className='cart-img' />
                            </div>
                        </Link>
                    </Grid>
                    <Grid item lg={10} >
                        <Link to={`/Detail/type/${product?.productId?.type}/${product?.productId?._id}`}>
                            <Typography color="primary" variant="subtitle2" sx={{ textAlign: 'center', height: '100%', width: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{product?.productId?.name}</Typography>
                        </Link>
                    </Grid>
                </Grid>
            </TableCell>
            <TableCell>
                <Typography color="primary" variant="subtitle2" sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>₹{product?.productId?.price}</Typography>

            </TableCell>
            <TableCell>
                <Typography color="primary" variant="subtitle2" sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{date}</Typography>

            </TableCell>
            <TableCell sx={{ textAlign: 'center' }}>
                <Tooltip
                    title='Remove From Cart'>
                    <Button variant='contained' style={{ width: 20 }} color='error' onClick={() => removeFromCart(product)}  ><AiFillDelete style={{ fontSize: 15 }} /></Button>
                </Tooltip>
            </TableCell>

        </TableRow>

    );
}

export default CartTable;
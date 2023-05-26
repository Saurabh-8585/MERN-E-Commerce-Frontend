import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ProductCard from '../../../Components/Card/Product Card/ProductCard';
import { Link } from 'react-router-dom';

const UserOrderItem = ({ commonGetRequest, id }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        commonGetRequest(process.env.REACT_APP_ADMIN_GET_ORDER, id, setData);
    }, [])
    const total = data.reduce((acc, curr) => (acc + curr.totalAmount), 0);
    return (
        <Container>
            <Typography variant='h6' fontWeight="bold" sx={{ margin: '20px 0', textAlign: 'center' }}>User Orders</Typography>
            {data.length === 0 ?
                <Typography variant='h6' textAlign="center">User not order any thing yet</Typography>
                :
                <>
                    <Typography variant='h6' textAlign='center' >Total Amount Spend  <span style={{color:"#1976d2"}}>₹{total} </span> </Typography>
                    <Box>
                        <Box className='similarProduct' sx={{ display: 'flex', overflowX: 'auto',justifyContent:'center', marginBottom: 10 }}>
                            {
                                data.map(product => (
                                    product.productData.map(prod => <Link to={`/Detail/type/${prod.productId.type}/${prod.productId._id}`} key={prod._id}>
                                        <ProductCard prod={prod.productId} />
                                    </Link>
                                    )
                                )
                                )}
                        </Box>
                    </Box>
                </>
            }
        </Container>

    )
}

export default UserOrderItem
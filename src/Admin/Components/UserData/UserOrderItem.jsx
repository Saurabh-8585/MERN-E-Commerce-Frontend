import { Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import ProductCard from '../../../Components/Card/Product Card/ProductCard';
import { Link } from 'react-router-dom';

const UserOrderItem = ({ commonGetRequest, id }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        commonGetRequest(process.env.REACT_APP_ADMIN_GET_ORDER, id, setData);
    }, [])
    const total = data.reduce((acc, curr) => (acc + curr.totalAmount), 0);
    console.log(total);
    console.log(data);
    return (
        <div>
            <Typography variant='h6'>Total Amount Spend ₹{total}  </Typography>
            <Box>
                <Box className='similarProduct' sx={{ display: 'flex', overflowX: 'auto', marginBottom: 10 }}>

                </Box>
            </Box>
        </div>

    )
}

export default UserOrderItem
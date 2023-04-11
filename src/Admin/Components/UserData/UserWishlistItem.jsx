import React, { useEffect, useState } from 'react'
import { Container, Typography } from '@mui/material'
import CartCard from '../../../Components/Card/CartCard/CartCard'
import axios from 'axios'
import { toast } from 'react-toastify'

const UserWishlistItem = ({ authToken, id, commonGetRequest }) => {

    const [userWishlist, setUserWishlist] = useState([]);

    useEffect(() => {
        commonGetRequest(process.env.REACT_APP_ADMIN_GET_WISHLIST, id, setUserWishlist);
    }, [])
    const removeCartItemByAdmin = async (product) => {
        try {
            console.log(product._id);
            const { data } = await axios.delete(`${process.env.REACT_APP_ADMIN_DELETE_WISHLIST}/${product._id}`, {
                headers: {
                    'Authorization': authToken
                }
            });
            if (data.success === true) {
                setUserWishlist(userWishlist.filter(c => c.productId._id !== product.productId._id))
                toast.success("Removed From Cart", { autoClose: 500, theme: 'colored' })
            }
            else {
                toast.error("Something went wrong", { autoClose: 500, theme: 'colored' })

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg, { autoClose: 500, theme: "colored" });
        }
    }
    return (
        <>
            <Typography variant='h6' fontWeight="bold" sx={{ margin: '20px 0', textAlign: 'center' }}>User Wishlist</Typography>
            {userWishlist.length < 1 && <Typography variant='h6' sx={{ margin: '40px 0', textAlign: 'center' }}>No items in wishlist</Typography>}
            <Container maxWidth='xl' style={{ marginTop: 10, display: "flex", justifyContent: 'center', flexWrap: "wrap", paddingBottom: 20, marginBottom: 30, width: '100%' }}>
                {userWishlist.map(prod => (
                    <CartCard product={prod} removeFromCart={removeCartItemByAdmin} key={prod.id} />
                ))}

            </Container>
        </>
    )
}

export default UserWishlistItem
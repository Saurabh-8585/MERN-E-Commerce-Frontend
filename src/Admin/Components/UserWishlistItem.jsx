import React from 'react'
import { Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import ProductCard from '../../Components/Card/Product Card/ProductCard'

const UserWishlistItem = ({ userWishlist }) => {
    return (
        <>
            <Typography variant='h6' sx={{ margin: '20px 0', textAlign: 'center' }}>User Wishlist</Typography>
            <Container maxWidth='xl' style={{ marginTop: 10, display: "flex", justifyContent: 'center', flexWrap: "wrap", paddingBottom: 20, marginBottom: 30, width: '100%' }}>
                {userWishlist.map(prod => (
                    <Link to={`/Detail/type/${prod.productId.type}/${prod.productId._id}`} key={prod._id}>
                        <ProductCard prod={prod.productId} />
                    </Link>
                ))}

            </Container>
        </>
    )
}

export default UserWishlistItem
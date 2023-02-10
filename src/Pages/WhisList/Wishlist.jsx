import { Container } from '@mui/system'
import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import CartCard from '../../Components/Card/CartCard'
import { ContextFunction } from '../../Context/Context'

const Wishlist = () => {
    const { wishlistData, setWishlistData } = useContext(ContextFunction)
    let authToken = localStorage.getItem('Authorization')
    let setProceed = authToken ? true : false

    useEffect(() => {
        getWishList()
    }, [])
    const getWishList = async () => {

        const { data } = await axios.get(`${process.env.REACT_APP_GET_WISHLIST}`,
            {
                headers: {
                    'Authorization': authToken
                }
            })
        setWishlistData(data)

    }
    const removeFromWishlist = async (product) => {
        if (setProceed) {
            const { data } = await axios.delete(`${process.env.REACT_APP_DELETE_WISHLIST}/${product.productId._id}`, {
                headers: {
                    'Authorization': authToken
                }
            })
            toast.error("Removed From Wishlist", { autoClose: 500, })
            getWishList()

        }
    }
    return (
        <Container maxWidth='xl' style={{ display: "flex", justifyContent: 'center', flexWrap: "wrap", paddingBottom: 20 }}>
            <ToastContainer />

            {wishlistData.map(product => (

                < CartCard product={product} removeFromCart={removeFromWishlist} key={product._id} />
            ))}
        </Container>
    )
}

export default Wishlist
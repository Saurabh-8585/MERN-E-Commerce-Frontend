import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Wishlist = () => {
    const [wishlistData, setWishlistData] = useState([])
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
    console.log(wishlistData)
    return (
        <div>lorem10000</div>
    )
}

export default Wishlist
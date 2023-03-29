import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SingleUserPage = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState([]);
    const [userCart, setUserCart] = useState([]);
    const [userWishlist, setUserWishlist] = useState([]);
    const [userReview, setUserReview] = useState([]);
    let authToken = localStorage.getItem("Authorization")

    useEffect(() => {
        commonGetRequest(process.env.REACT_APP_ADMIN_GET_USER, id, setUserData);
        commonGetRequest(process.env.REACT_APP_ADMIN_GET_CART, id, setUserCart);
        commonGetRequest(process.env.REACT_APP_ADMIN_GET_WISHLIST, id, setUserWishlist);
        commonGetRequest(process.env.REACT_APP_ADMIN_GET_REVIEW, id, setUserReview);
    }, [])
    console.log({ userData, userCart, userReview, userWishlist }, 12);
    const commonGetRequest = async (url, userId, setData) => {
        try {
            const { data } = await axios.get(`${url}/${userId}`, {
                headers: {
                    'Authorization': authToken
                }
            });
            console.log(data);
            setData(data)
        } catch (error) {
            console.log(error);

        }

    }
    return (
        <div>SingleUserPage{id}</div>
    )
}

export default SingleUserPage
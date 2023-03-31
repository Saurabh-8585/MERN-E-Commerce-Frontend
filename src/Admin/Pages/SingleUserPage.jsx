import axios from 'axios';
import React, { useEffect, useState } from 'react'
import UserInfoItem from '../Components/UserInfoItem';
import UserCartItem from '../Components/UserCartItem';
import UserWishlistItem from '../Components/UserWishlistItem';
import UserReviewItem from '../Components/UserReviewItem';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';

const SingleUserPage = () => {
    const { id } = useParams();
    let authToken = localStorage.getItem("Authorization")
    const commonGetRequest = async (url, userId, setData) => {
        try {
            const { data } = await axios.get(`${url}/${userId}`, {
                headers: {
                    'Authorization': authToken
                }
            });
            setData(data)
        } catch (error) {
            console.log(error);

        }

    }
    return (
        <>
            <Container>
                <UserInfoItem commonGetRequest={commonGetRequest} authToken={authToken} id={id} />
                <UserCartItem commonGetRequest={commonGetRequest} authToken={authToken} id={id} />
                <UserWishlistItem commonGetRequest={commonGetRequest} authToken={authToken} id={id} />
                <UserReviewItem commonGetRequest={commonGetRequest} authToken={authToken} id={id} />
            </Container >
        </>
    )
}

export default SingleUserPage
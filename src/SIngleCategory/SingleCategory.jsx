import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
const SingleCategory = () => {
    const { cat } = useParams()
    console.log(cat);
    const getCategoryProduct = async () => {
        const getData = await axios.post(`${process.env.REACT_APP_PRODUCT_TYPE}`, {userType:cat})
        const response = await getData
        console.log(response);
    }
    useEffect(() => {
        getCategoryProduct()
    }, [])
    return (
        <div>SingleCategory</div>
    )
}

export default SingleCategory